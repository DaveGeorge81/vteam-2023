import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50
    },
    contentText: {
        color: "#333"
    },
    map: {
        height: "65%",
        flex: 1,
        padding: 50
    },
    top: {
        height: "35%",
        flex: 1,
        padding: 50
    },
    scanner: {
        height: "50%",
        padding: 50
    },
    qr: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 3,
        left: "25%",
        width: "85%"
    },
    balance: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20
    },
    smallHeader: {
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 10
    },
    topHeader: {
        textAlign: "center",
        padding: 20,
        fontSize: 28,
    },
    rentHistory: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 10
    },
    fees: {
        textAlign: "center"
    },
    note: {
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 10,
        marginTop: 10
    }
    
})