# Getting Started

## Install node
curl -L https://npmjs.org/install.sh | sudo sh

## Install hsqldb

## Configuration
node version: 14.19.3 <br>
npm version: 8.13.1 <br>
hsqldb version: 2.3.4 <br>
java version: jdk8 <br>

# Run
## Run database (not included)
java -cp ../lib/hsqldb.jar org.hsqldb.server.Server --database.0 testdb

## Unzip bin directory, then:

## Install node modules
cd frontend && npm install

## Run frontend
cd frontend && npm start

## Run backend
java -jar listadellaspesa-*.jar