# Backend server and database

## API endpoints
Documentation is available at localhost:1337 or localhost:1337/api/v1/.

## Notes
A few API endpoints perform special actions and may involve several database updates, notably:

* `PUT /users/withdraw`
* `PUT /bikes/check_park_zone`
* `PUT /bikes/start_charge`
* `PUT /bikes/stop_charge`
* `POST /rides` (start a ride)
* `PUT /rides` (finish a ride)

