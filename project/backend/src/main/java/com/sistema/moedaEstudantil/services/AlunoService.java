package com.sistema.moedaEstudantil.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistema.moedaEstudantil.dto.AlunoUpdateDTO;
import com.sistema.moedaEstudantil.dto.LoginDTO;
import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.repositories.AlunoRepository;

import jakarta.transaction.Transactional;

@Service
public class AlunoService {

    private final AlunoRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AlunoService(AlunoRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Aluno cadastrarAluno(Aluno aluno) {
        if (repository.existsByCpf(aluno.getCpf()))
            throw new IllegalArgumentException("Erro: CPF já cadastrado no sistema");
        if (repository.existsByEmail(aluno.getEmail()))
            throw new IllegalArgumentException("Erro: Email já cadastrado no sistema");

        aluno.setSenha(passwordEncoder.encode(aluno.getSenha()));
        return repository.save(aluno);
    }

    @Transactional
    public Aluno atualizarAluno(Long id, AlunoUpdateDTO dto) {
        Aluno alunoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com o id: " + id));

        if (dto.email() != null) {
            repository.findByEmail(dto.email())
                    .ifPresent(a -> {
                        if (!a.getId().equals(id)) {
                            throw new IllegalArgumentException("Email já cadastrado por outro usuário!");
                        }
                    });
        }

        if (dto.nome() != null)
            alunoExistente.setNome(dto.nome());
        if (dto.email() != null)
            alunoExistente.setEmail(dto.email());
        if (dto.senha() != null && !dto.senha().isEmpty())
            alunoExistente.setSenha(passwordEncoder.encode(dto.senha()));
        if (dto.endereco() != null)
            alunoExistente.setEndereco(dto.endereco());

        return repository.save(alunoExistente);
    }

    @Transactional
    public Aluno getAlunoById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Iterable<Aluno> getAllAlunos() {
        return repository.findAll();
    }

    @Transactional
    public void deletarAluno(Long id) {
        repository.deleteById(id);
    }

    public Aluno login(LoginDTO loginDTO) {
        Optional<Aluno> aluno = repository.findByEmail(loginDTO.email());

        if (aluno.isPresent() && passwordEncoder.matches(loginDTO.senha(), aluno.get().getSenha())) {
            return aluno.get();
        } else {
            throw new RuntimeException("Credenciais inválidas");
        }
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public boolean existsByCpf(String cpf) {
        return repository.existsByCpf(cpf);
    }
}
