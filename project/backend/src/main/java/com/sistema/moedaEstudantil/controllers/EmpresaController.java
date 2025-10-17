package com.sistema.moedaEstudantil.controllers;

import com.sistema.moedaEstudantil.dto.EmpresaCreateDTO;
import com.sistema.moedaEstudantil.dto.EmpresaUpdateDTO;
import com.sistema.moedaEstudantil.dto.LoginDTO;
import com.sistema.moedaEstudantil.models.Empresa;
import com.sistema.moedaEstudantil.services.EmpresaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = "*")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarEmpresa(@RequestBody EmpresaCreateDTO empresaCreateDTO) {
        try {
            Empresa empresa = empresaCreateDTO.toEntity(Empresa.class);
            Empresa novoEmpresa = empresaService.cadastrarEmpresa(empresa);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoEmpresa.toDTO());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar empresa: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginEmpresa(@RequestBody LoginDTO loginDTO) {
        try {
            Empresa empresa = empresaService.login(loginDTO);

            return ResponseEntity.ok(Map.of(
                    "id", empresa.getId(),
                    "mensagem", "Login successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEmpresas() {
        try {
            return ResponseEntity.ok(empresaService.getAllEmpresas());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar empresas: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public String atualizarEmpresa(@PathVariable Long id, @RequestBody EmpresaUpdateDTO empresaUpdateDTO) {
        Empresa empresaAtualizado = empresaService.atualizarEmpresa(id, empresaUpdateDTO);

        if (empresaAtualizado == null) {
            return "Empresa nao encontrado";
        }

        return empresaAtualizado.toDTO().toString();
    }

    @GetMapping("/{id}")
    public String getEmpresaById(@PathVariable Long id) {
        Empresa empresa = empresaService.getEmpresaById(id);
        return empresa != null ? empresa.toDTO().toString() : "Empresa não encontrado";
    }

    @DeleteMapping("/deletar/{id}")
    public String deletarEmpresa(@PathVariable Long id) {
        Empresa empresa = empresaService.getEmpresaById(id);
        if (empresa != null) {
            empresaService.deletarEmpresa(id);
            return "Empresa deletado com sucesso";
        } else {
            return "Empresa não encontrado";
        }
    }

}
