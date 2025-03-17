node_modules/.bin/ng-openapi-gen --input src/api/api-doc/api-docs.json --output src/api

ng g component /modules/dashboard/stream --module=/modules/dashboard/dashboard.module.ts 

docker build -t zama-registrar-fe .

docker run -p 3600:80 zama-registrar-fe