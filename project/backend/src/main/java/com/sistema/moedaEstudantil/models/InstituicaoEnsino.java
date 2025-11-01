package com.sistema.moedaEstudantil.models;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "instituicao_ensino")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class InstituicaoEnsino{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @Column(name = "cnpj")
    private String cnpj;
}