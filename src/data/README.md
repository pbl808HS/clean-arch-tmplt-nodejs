Data is for directed reference to our databases like postgresql, mysql, mongodb

Why? because this way we have decoupled our models from entities to only change an adapter or implementation in case we need to change the db driver.