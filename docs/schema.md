# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## photos
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
image           | file      | not null
thumbnail       | file      | not null
title           | string    | not null
description     | text      |
user_id         | integer   | not null, foreign key (references users)

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
body            | text      | not null
user_id         | integer   | not null, foreign key (references users)
photo_id        | integer   | not null, foreign key (references photos)

## votings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
photo_id        | integer   | not null, foreign key (references photos)
like            | boolean   | not null
unique index between user_id and photo_id
