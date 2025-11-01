package com.sistema.moedaEstudantil.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.moedaEstudantil.dto.InstituicaoEnsinoDTO;
import com.sistema.moedaEstudantil.services.InstituicaoEnsinoService;

@RestController
@RequestMapping("/instituicoes")
public class InstituicaoEnsinoController {

    private InstituicaoEnsinoService instituicaoEnsinoService;

    public InstituicaoEnsinoController(InstituicaoEnsinoService instituicaoEnsinoService) {
        this.instituicaoEnsinoService = instituicaoEnsinoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<InstituicaoEnsinoDTO>> buscarTodas() {
        List<InstituicaoEnsinoDTO> resposta = instituicaoEnsinoService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

}
