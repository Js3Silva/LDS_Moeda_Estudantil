package com.sistema.moedaEstudantil.controllers;

import com.sistema.moedaEstudantil.dto.AlunoCreateDTO;
import com.sistema.moedaEstudantil.dto.AlunoUpdateDTO;
import com.sistema.moedaEstudantil.dto.LoginDTO;
import com.sistema.moedaEstudantil.models.Aluno;
import com.sistema.moedaEstudantil.services.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarAluno(@RequestBody AlunoCreateDTO alunoCreateDTO) {
        try {
            Aluno aluno = alunoCreateDTO.toEntity(Aluno.class);
            Aluno novoAluno = alunoService.cadastrarAluno(aluno);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno.toDTO());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar aluno: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAluno(@RequestBody LoginDTO loginDTO) {
        try {
            Aluno aluno = alunoService.login(loginDTO);

            return ResponseEntity.ok(Map.of(
                    "id", aluno.getId(),
                    "mensagem", "Login realizado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllAlunos() {
        try {
            return ResponseEntity.ok(alunoService.getAllAlunos());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar alunos: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarAluno(@PathVariable Long id, @RequestBody AlunoUpdateDTO alunoUpdateDTO) {
        try {
            Aluno alunoAtualizado = alunoService.atualizarAluno(id, alunoUpdateDTO);
            return ResponseEntity.ok(alunoAtualizado.toDTO());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar aluno: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAlunoById(@PathVariable Long id) {
        Aluno aluno = alunoService.getAlunoById(id);
        return aluno != null ? ResponseEntity.ok(aluno.toDTO())
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarAluno(@PathVariable Long id) {
        Aluno aluno = alunoService.getAlunoById(id);
        if (aluno != null) {
            alunoService.deletarAluno(id);
            return ResponseEntity.ok("Aluno deletado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado");
        }
    }
}
