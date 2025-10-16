package com.sistema.moedaEstudantil.services;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.sistema.moedaEstudantil.dto.AlunoCreateDTO;
import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.repositories.AlunoRepository;

import jakarta.transaction.Transactional;

public class AlunoService {
    private final AlunoRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AlunoService(AlunoRepository repository, PasswordEncoder passwordEncoder){  
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Aluno cadastrarAluno(AlunoCreateDTO aluno){
        if (repository.existsByCpf(aluno.cpf())) 
                    throw new IllegalArgumentException("Erro: CPF ja cadastrado no sistema");
        if (repository.existsByEmail(aluno.email())) 
                    throw new IllegalArgumentException("Erro: Email ja cadastrado no sistema");
        
        aluno.setSenha(PasswordEncoder.encode(aluno.senha()));
        
        return repository.save(aluno);
    }

}
