package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.Empresa;
import com.sistema.moedaEstudantil.models.IMappable;
import jakarta.validation.constraints.NotBlank;

public record EmpresaCreateDTO(
        @NotBlank String nome,
        @NotBlank String email,
        @NotBlank String senha,
        @NotBlank String cnpj
) implements IMappable<Empresa> {
}
