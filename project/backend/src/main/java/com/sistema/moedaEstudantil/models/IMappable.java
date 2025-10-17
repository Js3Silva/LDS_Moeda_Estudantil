package com.sistema.moedaEstudantil.models;

import com.sistema.moedaEstudantil.utils.ObjectMapperConfig;

public interface IMappable<T> {

    default T toEntity(Class<T> entityClass) {
        return ObjectMapperConfig.OBJECT_MAPPER.convertValue(this, entityClass);
    }
}

