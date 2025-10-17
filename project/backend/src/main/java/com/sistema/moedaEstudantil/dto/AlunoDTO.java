package com.sistema.moedaEstudantil.dto;

import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.models.Endereco;
import com.sistema.moedaEstudantil.models.IMappable;

public record AlunoDTO (
  Long id,
  String nome,
  String email,
  String rg,
  String cpf,
  float quantidadeMoeda,
  Endereco endereco
)implements IMappable<Aluno> {
}