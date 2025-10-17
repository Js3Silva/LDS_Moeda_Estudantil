package com.sistema.moedaEstudantil.models;

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
public class Empresa extends Usuario {

    @Column(name = "cnpj", length = 18, unique = true)
    private String cnpj;

    public EmpresaDTO toDTO() {
        return new EmpresaDTO(
                id, nome, cnpj, email, senha
        );
    }
}