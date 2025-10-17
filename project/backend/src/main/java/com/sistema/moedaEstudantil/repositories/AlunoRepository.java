package com.sistema.moedaEstudantil.repositories;

import org.springframework.stereotype.Repository;

import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.models.Empresa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long>{
    boolean existsByEmail(String email);
    boolean existsByCpf(String cnpj);

    Optional<Aluno> findByEmail(String email);
    Optional<Aluno> findById(Long id);
    Optional<Aluno> findByCpf(String cpf);
    
} 