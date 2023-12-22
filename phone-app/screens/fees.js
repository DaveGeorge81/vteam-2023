import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { globalStyles } from '../styles/global';
import axios from 'axios';
import { IP } from '@env'

export default function Fees() {

    const [cities, setCities] = useState([]);

    const [selected, setSelected] = useState("Karlskrona");

    const [fees, setFees] = useState([]);

    const [showFees, setShowFees] = useState(false);

    useEffect(() => {
        // Passing configuration object to axios
            const fetchData = async () => {
                await axios({
                    method: 'get',
                    url: `http://${IP}:1337/api/v1/cities`,
                }).then((response) => {
                    setCities(response.data);
                    // console.log(response.data);
                });
            }
            fetchData()
            .catch(console.error)
        }, []);

        const selectedCity = cities.filter((item) => item.name == selected).map(({id, name, lon, lat, dlon, dlat}) => ({id, name, lon, lat, dlon, dlat}));


        const fetchFees = async () => {
            await axios({
                method: 'get',
                url: `http://${IP}:1337/api/v1/pricing/city/${selectedCity[0].id}`,
            }).then((response) => {
                setFees(response.data);
                setShowFees(true);
                // console.log(response.data);
            });
            }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.smallHeader}>Select city to view current fees:</Text>
            <View>
                <SelectList 
                data={cities.map(item => {
                    return {key: item.id, value: item.name}
                })}
                placeholder="Select City"
                save="value"
                search={false}
                setSelected={(val) => setSelected(val)} 
                onSelect={() => {
                    fetchFees();
                }}
                />
            </View>
            {showFees && <View>
                <Text style={globalStyles.smallHeader}>Current fees:</Text>
                <Text style={globalStyles.fees}>Start fee: {fees.start_fee}kr</Text>
                <Text style={globalStyles.fees}>Minute fee: {fees.minute_fee}kr</Text>
                <Text style={globalStyles.fees}>Extra fee*: {fees.extra_fee}kr</Text>
                <Text style={globalStyles.fees}>Discount*: {fees.discount}kr</Text>
                <Text style={globalStyles.note}>* Extra fee is charged upon parking outside P-zone.
                    Discount is given when renting bike outside P-zone and then parking within P-zone.</Text>
            </View>}
        </View>
    )
} 

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24
//     },
//     content: {
//         padding: 24
//     }
// });