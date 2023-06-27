import React, { ReactNode, useEffect, useState } from "react";
import {
  Box,
  chakra,
  Flex,
  Heading,
  Button,
  Stack,
  useToast,
  useBreakpointValue,
  Collapse,
  HStack,
  useBoolean,
} from "@chakra-ui/react";
import { setAuthHeaders, srfApi } from "services/apiService";
import { InputBox } from "components/Inputs/InputBox";
import { DateTime } from "luxon";
import { SelectInputBox } from "components/Inputs/SelectInputBox";
import { SwitchButton } from "components/Buttons/SwitchButton";
import { useCustomForm } from "hooks";
import download from "downloadjs";
import { maskCapitalize } from "utils/maskCapitalize";
import { useSession } from "next-auth/react";
import Head from "next/head";

/**
 * Renderiza a página de listagem de frequências a baixar.
 * @method BaixarFrequencias
 * @module pages
 * @param {Component} children o componente-filho que este irá compor.
 * @returns {Component} Componente estilizado.
 */
export default function BaixarFrequencias({ children }) {
  const session = useSession();
  const [frequenciasFromBd, setFrequenciasFromBd] = useState(null);
  const [isDownloading, setIsDownloading] = useBoolean();
  const toast = useToast();
  const position = useBreakpointValue({ base: "bottom", sm: "top-right" });

  const formBuscarFrequencias = useCustomForm();

  const onSubmitBuscarFrequencias = ({ mesAno, ...formData }, e) => {
    e.preventDefault();
    setFrequenciasFromBd(null);
    formBuscarFrequencias.setLoading();
    formData.codProjetos = [1000];
    formData.competencia = DateTime.fromFormat(mesAno, "yyyy-MM").toFormat(
      "MM/yyyy"
    );
    formData.situacaoFuncionario = null;
    formData.isTodasSituacoes = false;
    console.log(formData);
    srfApi
      .post(`/frequencias/obterFrequencias`, formData)
      .then((res) => {
        setFrequenciasFromBd(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            title: `${err.response.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: false,
            position,
          });
        }

        console.log(err);
      })
      .finally(formBuscarFrequencias.setLoaded);
  };

  const startDownload = async () => {
    setIsDownloading.on();
    const freqToDownload = frequenciasFromBd.map((freq) => {
      srfApi
        .get(`/frequencias/${freq.id}/joinDownload`, {
          responseType: "blob",
        })
        .then(({ data, headers }) => {
          const content = headers["content-type"];
          const fileName = `${maskCapitalize(freq.nome)
            .trim()
            .split(" ")
            .join("_")}_${freq.matricula}_${freq.competencia.replace(
            "/",
            "_"
          )}.pdf`;
          download(data, fileName, content);
        });
    });
    await Promise.all(freqToDownload);
    setIsDownloading.off();
  };

  const situacaoFrequenciaOptions = [
    {
      id: "Aberta",
      value: "Aberta",
      label: "Aberta",
    },
    {
      id: "Validada",
      value: "Validada",
      label: "Validada",
    },
    {
      id: "Disponibilizada",
      value: "Disponibilizada",
      label: "Disponibilizada",
    },
    {
      id: "Reprovada",
      value: "Reprovada",
      label: "Reprovada",
    },
    {
      id: "Reaberta",
      value: "Reaberta",
      label: "Reaberta",
    },
    {
      id: "Fechada",
      value: "Fechada",
      label: "Fechada",
    },
    {
      id: "Corrigida",
      value: "Corrigida",
      label: "Corrigida",
    },
    {
      id: "Pendente aprovação outras faltas",
      value: "Pendente aprovação outras faltas",
      label: "Pendente aprovação outras faltas",
    },
    {
      id: "Pendente aprovação médica",
      value: "Pendente aprovação médica",
      label: "Pendente aprovação médica",
    },
  ];

  useEffect(() => {
    const { data, status } = session;
    if (status && status === "authenticated") {
      setAuthHeaders(data.user);
    }
  }, [session]);

  return (
    <>
      <Head>
      <title>Baixar Frequências - SRF Helper</title>
    </Head>
    <Box>
      <Flex mb={4}>
        <Heading size="lg" color="primary.600">
          Baixar Frequências
        </Heading>
      </Flex>
      <Stack spacing={4}>
        <Stack
          as={chakra.form}
          onSubmit={formBuscarFrequencias.handleSubmit(
            onSubmitBuscarFrequencias
          )}
          p={5}
          bg="whiteAlpha.900"
          rounded="lg"
          shadow="md"
          spacing={4}
        >
          <InputBox
            id="mesAno"
            label="Mês/Ano"
            type="month"
            formControl={formBuscarFrequencias.control}
          />
          <SelectInputBox
            id="situacaoFrequenciaDescicao"
            label="Situação Frequência"
            formControl={formBuscarFrequencias.control}
            options={situacaoFrequenciaOptions}
            defaultValue={situacaoFrequenciaOptions[0]}
            required={false}
          />
          <InputBox
            id="matricula"
            label="Matrícula"
            placeholder="Deixe em branco para buscar todas"
            formControl={formBuscarFrequencias.control}
            required={false}
            type="number"
          />
          <SwitchButton
            id="isAnexo"
            label="Com anexos"
            formControl={formBuscarFrequencias.control}
            defaultChecked
            required={false}
          />
          <Box alignSelf="flex-end" pt={2}>
            <Button
              type="submit"
              colorScheme="primary"
              isLoading={formBuscarFrequencias.isLoading}
              loadingText="Carregando..."
              isDisabled={!formBuscarFrequencias.validation || isDownloading}
            >
              Buscar
            </Button>
          </Box>
        </Stack>
        <Stack
          as={Collapse}
          animateOpacity
          in={Array.isArray(frequenciasFromBd)}
          rounded="lg"
          shadow="md"
          bg="whiteAlpha.900"
          p={5}
          spacing={4}
        >
          <HStack>
            <Heading pe={0.5} color="gray.500" size="md">
              Projeto:
            </Heading>
            <Heading color="gray.700" size="md">
              Primeiro Emprego
            </Heading>
          </HStack>
          <HStack>
            <Heading pe={0.5} color="gray.500" size="md">
              Frequências localizadas:
            </Heading>
            <Heading color="gray.700" size="md">
              {Array.isArray(frequenciasFromBd) && frequenciasFromBd.length}
            </Heading>
          </HStack>
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="primary"
              onClick={startDownload}
              isLoading={formBuscarFrequencias.isLoading}
              loadingText="Baixando frequências..."
            >
              Baixar Frequências
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Box>
    </>
  );
}

BaixarFrequencias.dashboard = true;
BaixarFrequencias.auth = true;
