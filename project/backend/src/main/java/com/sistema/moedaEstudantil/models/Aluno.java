package com.sistema.moedaEstudantil.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Aluno extends Usuario {

    @Column(name = "cpf", length = 11, unique = true)
    private String cpf;

    @Column(name = "rg", length = 20, unique = true)
    private String rg;

    @Column(name = "quantidadeMoeda", nullable = false)
    protected int quantidadeMoeda;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;
}
