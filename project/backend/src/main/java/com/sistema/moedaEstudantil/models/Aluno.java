package com.sistema.moedaEstudantil.models;

import com.sistema.moedaEstudantil.dto.AlunoDTO;
import com.sistema.moedaEstudantil.dto.EmpresaDTO;

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
public class Aluno extends Usuario {

    @Column(name = "cpf", length = 11, unique = true)
    private String cpf;

    @Column(name = "rg", length = 20, unique = true)
    private String rg;

    @Column(name = "quantidadeMoeda", nullable = false)
    protected float quantidadeMoeda;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;


    public AlunoDTO toDTO() {
        return new AlunoDTO(
                id, nome, email, rg, cpf, quantidadeMoeda, endereco
        );
    }


}
