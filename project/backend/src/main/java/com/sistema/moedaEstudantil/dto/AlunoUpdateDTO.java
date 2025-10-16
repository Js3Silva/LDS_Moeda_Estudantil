package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.models.Endereco;
import com.sistema.moedaEstudantil.models.IMappable;

import jakarta.validation.constraints.NotBlank;

public record AlunoUpdateDTO(
    @NotBlank Long id,
    @NotBlank String name,
    @NotBlank String email,
    @NotBlank String senha,
    @NotBlank Endereco endereco
) implements IMappable<Aluno> {
}
