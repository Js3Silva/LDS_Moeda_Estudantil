package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.InstituicaoEnsino;
import com.sistema.moedaEstudantil.models.IMappable;

public record InstituicaoEnsinoCreateDTO (
        Long id,
        String nome,
        String endereco,
        String telefone,
        String email,
        String cnpj
) implements IMappable<InstituicaoEnsino> {
    
}
