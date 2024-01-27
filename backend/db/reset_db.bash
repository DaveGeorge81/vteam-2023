#!/usr/bin/env bash
#
# A script for resetting the database bike-rentals.sqlite
#

# Clear db file
> bike-rentals.sqlite

# Read commands from create-tables.sql (redirect any output to /dev/null)
sqlite3 bike-rentals.sqlite < create-tables.sql > /dev/null

