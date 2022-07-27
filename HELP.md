# Getting Started

## Install node
curl -L https://npmjs.org/install.sh | sudo sh

## Install & run hsqldb
java -cp ../lib/hsqldb.jar org.hsqldb.server.Server --database.0 testdb


# Run
Unzip bin directory, then:

## Install node modules
cd frontend && npm install

## Run frontend
cd frontend && npm start

## Run backend
java -jar listadellaspesa-*.jar

