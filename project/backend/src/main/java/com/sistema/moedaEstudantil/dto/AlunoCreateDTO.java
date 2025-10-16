package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.models.Endereco;
import com.sistema.moedaEstudantil.models.IMappable;

import jakarta.validation.constraints.NotBlank;

public record AlunoCreateDTO(
  @NotBlank String name,
  @NotBlank String email,
  @NotBlank String senha,
  @NotBlank String rg,
  @NotBlank String cpf,
  @NotBlank float quantidadeMoeda,
  @NotBlank Endereco endereco
) implements IMappable<Aluno> {
}
