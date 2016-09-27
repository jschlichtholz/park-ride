# Parking Lot Availability Plotting
The scripts contained in this folder generate parking lot availability graphs.

To run this tooling execute the `run.sh` script. This will collect all JSON data from the data folder,
convert it to CSV and generate plots.

## Requirements
This software requires `awk`, `find` and `Rscript` to be available in the path.

## Deployment
When running these scripts on a server add the following two entries to the `/etc/crontab` file:

```
0,15,30,45 * * * * root curl http://opendata.dbbahnpark.info/api/beta/occupancy > /path/to/data/`date --iso-8601=seconds`.json
30         2 * * * root cd /path/to/run.sh && ./run.sh
```

This will fetch the current occupancy data from the server every 15 minutes. Graphs will be recalculated
every night at 2:30 am (UTC).

This requires some `cron`, `curl` and `date` to be available on the server side.

**Warning:** On a long running server this will create massive amounts of data after some weeks. Consider
to add a cleaning job to cron:

```
0          2 * * * root find /path/to/data -type f -iname "*.json" -mtime +7 -delete -print
```

This job will delete downloaded JSON files older than a week half an hour before recalculating the graphs.
