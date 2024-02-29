Infrastructure

Aqui ocurren las implementaciones con los datasources, por ejemplo la coneccion con la base de datos para consultar información con mongo o postrges o algun otro manejador de bds, aqui es el unico lugar donde se deben hacer modificaciones para la funcionalidad de la aplicación.

Mappers son objetos que toman y transforman objetos a alguna respuesta que se espera obtener por ejemplo, una entidad.

Repositories, son un puente para llamar al datasource, nos permite cambiar el destino del puente sin ningun problema.

