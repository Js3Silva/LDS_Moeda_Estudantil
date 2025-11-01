package com.sistema.moedaEstudantil.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sistema.moedaEstudantil.dto.InstituicaoEnsinoDTO;
import com.sistema.moedaEstudantil.repositories.InstituicaoEnsinoRepository;

@Service
public class InstituicaoEnsinoService {

    private final InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    public InstituicaoEnsinoService(InstituicaoEnsinoRepository instituicaoEnsinoRepository) {
        this.instituicaoEnsinoRepository = instituicaoEnsinoRepository;
    }

    public List<InstituicaoEnsinoDTO> findAll() {
        return instituicaoEnsinoRepository.findAll().stream()
                .map(entity -> new InstituicaoEnsinoDTO(
                        entity.getId(),
                        entity.getNome(),
                        entity.getEndereco(),
                        entity.getTelefone(),
                        entity.getEmail(),
                        entity.getCnpj()
                ))
                .collect(Collectors.toList());
    }
}
