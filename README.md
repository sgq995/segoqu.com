# segoqu.com
This monorepo contains the services I use for my personal website

## Development mode
- Building all the containers
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
```

- Setting up the whole project
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

- Exploring logs for different containers
```
docker-compose logs -f www
docker-compose logs -f api
docker-compose logs -f wordpress
```
