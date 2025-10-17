package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.Empresa;
import com.sistema.moedaEstudantil.models.IMappable;

public record EmpresaDTO (
    Long id,
    String nome,
    String cnpj,
    String email,
    String senha
) implements IMappable<Empresa> {
}
