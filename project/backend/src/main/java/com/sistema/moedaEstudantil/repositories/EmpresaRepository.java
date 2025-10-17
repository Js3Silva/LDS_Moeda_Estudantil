package com.sistema.moedaEstudantil.repositories;

import com.sistema.moedaEstudantil.models.Empresa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    boolean existsByEmail(String email);
    boolean existsByCnpj(String cnpj);

    Optional<Empresa> findByEmail(String email);
    Optional<Empresa> findById(Long id);
    Optional<Empresa> findByCnpj(String cnpj);
}
