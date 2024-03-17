# Booters
Booters is a user-driven platform to locate jumps at ski areas written in Typescript, React, Postgres, and Terraform.  This is an example starter project using this stack.  The project has a more permanent version named Hopspots in a private repository.

# Prerequisites
- NodeJS - the front end and back end are both powered by NodeJS
- Postgres DB - install this database system locally
- DBeaver (recommended DB interface tool)
- Terraform v1.5.5

# Branches
- `dev` is for active development
- `main` is the production branch


# Backend (/api)


### Database Migrations
This project uses knex to perform database migrations

To create a new migration file for a new `account` table, use the npm script

```
npm run knex:migrate:make account
```

useful knex links
https://gist.github.com/mjclemente/e74c33ab326e50ea5a961edfc847467c
https://github.com/jfollmann/knex-migrations-ts/tree/main




# Frontend (/web)
`react-scripts` should be installed globally 



# Infrastructure (/infra)

The infrastructure for this project is deployed on Google Cloud via Terraform.


## Environment Variables


`TF_VAR_gcp_hopspots_project_id`
