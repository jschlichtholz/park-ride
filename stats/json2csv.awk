{
  isId = match($0, "\"id\"");
  isTimestamp = match($0, "\"timestamp\"");
  isCategory = match($0, "\"category\"");

  if(isId) {
    if(record[0] != "") printRecord(record);
    record[0] = $0;
  }

  if(isTimestamp) {
    if(record[1] != "") printRecord(record);
    record[1] = $0;
  }

  if(isCategory) {
    if(record[2] != "") printRecord(record);
    record[2] = $0;
  }
}

function printRecord(record)
{
  sub("^[ \t]+\"id\" : ", "", record[0]);
  sub(",", "", record[0]);
  if(record[0] == "") {
    record[0] = NA;
  }

  sub("^[ \t]+\"timestamp\" : \"", "", record[1]);
  sub("\",", "", record[1]);
  if(record[1] == "") {
    record[1] = NA;
  }

  sub("^[ \t]+\"category\" : ", "", record[2]);
  sub(",", "", record[2]);
  if(record[2] == "") {
    record[2] = NA;
  }

  print record[0] "," record[1] "," record[2];

  for (i in record) {
    delete record[i]
  }
}
