package com.sistema.moedaEstudantil.services;

import com.sistema.moedaEstudantil.dto.LoginDTO;
import com.sistema.moedaEstudantil.models.Empresa;
import com.sistema.moedaEstudantil.dto.EmpresaUpdateDTO;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.sistema.moedaEstudantil.repositories.EmpresaRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class EmpresaService {

    private final EmpresaRepository repository;
    private final PasswordEncoder passwordEncoder;

    public EmpresaService(EmpresaRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Empresa cadastrarEmpresa(Empresa empresa) {
        if (repository.existsByEmail(empresa.getEmail())) {
            throw new IllegalArgumentException("Erro: Email já cadastrado.");
        }
        if (repository.existsByCnpj(empresa.getCnpj())) {
            throw new IllegalArgumentException("Erro: CPF já cadastrado.");
        }

        empresa.setSenha(passwordEncoder.encode(empresa.getSenha()));

        return repository.save(empresa);
    }

    @Transactional
    public Empresa atualizarEmpresa(long id, EmpresaUpdateDTO dto) {
        Empresa empresaExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrado com id: " + id));

        if (dto.email() != null) {
            repository.findByEmail(dto.email())
                    .ifPresent(c -> {
                        if (!c.getId().equals(id)) {
                            throw new IllegalArgumentException("Email já cadastrado por outro usuário!");
                        }
                    });
        }

        if (dto.cnpj() != null) {
            repository.findByCnpj(dto.cnpj())
                    .ifPresent(c -> {
                        if (!c.getId().equals(id)) {
                            throw new IllegalArgumentException("CPF já cadastrado por outro usuário!");
                        }
                    });
            empresaExistente.setCnpj(dto.cnpj());
        }

        if (dto.nome() != null) {
            empresaExistente.setNome(dto.nome());
        }
        if (dto.email() != null) {
            empresaExistente.setEmail(dto.email());
        }
        if (dto.senha() != null && !dto.senha().isEmpty()) {
            empresaExistente.setSenha(passwordEncoder.encode(dto.senha()));
        }

        return repository.save(empresaExistente);
    }

    @Transactional
    public Empresa getEmpresaById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<Empresa> getAllEmpresas() {
        return repository.findAll();
    }

    @Transactional
    public void deletarEmpresa(Long id) {
        repository.deleteById(id);

    }

    public Empresa login(LoginDTO loginDTO) {
        Optional<Empresa> empresa = repository.findByEmail(loginDTO.email());

        if (empresa.isPresent() && passwordEncoder.matches(loginDTO.senha(), empresa.get().getSenha())) {
            return empresa.get();
        } else {
            throw new RuntimeException("Credenciais inválidas");
        }
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public boolean existsByCpf(String cnpj) {
        return repository.existsByCnpj(cnpj);
    }

}