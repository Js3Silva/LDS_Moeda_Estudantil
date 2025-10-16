package com.sistema.moedaEstudantil.repositories;

import org.springframework.stereotype.Repository;

import com.sistema.moedaEstudantil.models.Empresa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AlunoRepository extends JpaRepository<Empresa, Long>{
    boolean existsByEmail(String email);
    boolean existsByCpf(String cnpj);

    Optional<Empresa> findByEmail(String email);
    Optional<Empresa> findById(Long id);
    Optional<Empresa> findByCpf(String cpf);
    
} 