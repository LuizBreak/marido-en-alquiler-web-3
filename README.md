# marido-en-alquiler-web

# A general services platform for connecting homeowner to handyman professional in Dominican Republic

## Development restart documentation

See [the project documentation](docs/README.md) for the purpose and architecture of both repositories, API/data reference, prioritized discrepancies and improvements, and safe development setup/verification results (reviewed November 15, 2026).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Activates json-server datbase

```
json-server db.json
```

### Compiles and minifies for production

```
npm run build
aws s3 sync dist/ s3://www.marido-en-alquiler.com
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
