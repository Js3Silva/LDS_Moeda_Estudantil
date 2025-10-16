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
public abstract class Aluno extends Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50, unique = false)
    private String nome;

    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "senha", length = 50, unique = false)
    private String senha;

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
