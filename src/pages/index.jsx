import React, { ReactNode, useEffect, useState } from "react";
import {
  Box,
  chakra,
  Flex,
  useDisclosure,
  Heading,
  Button,
  Stack,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { setAuthHeaders, srfApi } from "services/apiService";
import { InputBox } from "components/Inputs/InputBox";
import { useForm, useFormState } from "react-hook-form";
import ChakraTagInput from "components/Inputs/TagInput";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useCustomForm } from "hooks";
import Head from "next/head";

/**
 * Página inicial.
 * @method Home
 * @module pages
 * @param {Component} children o componente-filho que este irá compor.
 * @returns {Component} Componente estilizado.
 */
export default function Home({ children }) {
  const session = useSession();
  const toast = useToast();
  const position = useBreakpointValue({ base: "bottom", sm: "top-right" });

  const formBuscarFrequencias = useCustomForm();

  const onSubmit2 = (formData, e) => {
    srfApi
      .get(`/frequencias/matricula/8454`)
      .then((res) => console.log(res.data));
  };

  const onSubmit22 = async (formData, e) => {
    formBuscarFrequencias.setLoading();
    const { mesAno, matriculas } = formData;
    e.preventDefault();
    const dataConvertida = DateTime.fromFormat(mesAno, "yyyy-MM").toFormat(
      "MM/yyyy"
    );

    const promisesFrequencias = matriculas.map(({ value }) =>
      srfApi
        .get(`/frequencias/matricula/${value}`)
        .then(({ data }) => ({ matricula: value, data }))
    );

    const frequencias = await Promise.all(promisesFrequencias).then((res) => {
      return res.map(({ matricula, data }) => {
        return {
          ...data
            .filter(
              ({ mesAnoFrequencia }) => mesAnoFrequencia === dataConvertida
            )
            .pop(),
          matricula,
        };
      });
    });

    const marcacoes = [].concat(
      ...(await Promise.all(
        frequencias.map(({ id }) =>
          srfApi
            .get(`/frequencias/${id}/dias`)
            .then(({ data }) =>
              data.filter(
                (obj) =>
                  (Array.isArray(obj.marcacoes) && obj.marcacoes.length >= 1) ||
                  (Array.isArray(obj.abonos) && obj.abonos.length >= 1)
              )
            )
        )
      ))
    );

    const abonosParaValidar = new Array().concat(
      ...marcacoes
        .filter(({ abonos }) => abonos.length >= 1)
        .map(({ abonos }) => new Array().concat(...abonos.map((obj) => obj)))
    );

    const [outrasFaltas] = abonosParaValidar
      .filter(({ descJustificativa }) => descJustificativa === "OUTRAS FALTAS")
      .map((obj) => ({ ...obj, observacao: "Aprovação em Lote" }));

    console.log(outrasFaltas);

    await srfApi
      .put(`/abonos/aprovarAtestadoMedicoOrOutrasFaltas`, outrasFaltas)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    formBuscarFrequencias.setLoaded();
  };

  const onSubmit = async (formData, e) => {
    formBuscarFrequencias.setLoading();
    const { mesAno, matriculas } = formData;
    e.preventDefault();
    const dataConvertida = DateTime.fromFormat(mesAno, "yyyy-MM").toFormat(
      "MM/yyyy"
    );

    const promisesFrequencias = matriculas.map(({ value }) =>
      srfApi
        .get(`/frequencias/matricula/${value}`)
        .then(({ data }) => ({ matricula: value, data }))
    );

    const frequencias = await Promise.all(promisesFrequencias).then((res) => {
      return res.map(({ matricula, data }) => {
        return {
          ...data
            .filter(
              ({ mesAnoFrequencia }) => mesAnoFrequencia === dataConvertida
            )
            .pop(),
          matricula,
        };
      });
    });

    const marcacoes = [].concat(
      ...(await Promise.all(
        frequencias.map(({ id }) =>
          srfApi
            .get(`/frequencias/${id}/dias`)
            .then(({ data }) =>
              data
                .filter(
                  (obj) =>
                    (Array.isArray(obj.marcacoes) &&
                      obj.marcacoes.length >= 1) ||
                    (Array.isArray(obj.abonos) && obj.abonos.length >= 1)
                )
                .map((obj) => ({ ...obj, idFrequencia: id }))
            )
        )
      ))
    );

    const frequenciasParaValidar = new Array()
      .concat(
        ...marcacoes
          .filter(({ marcacoes }) => marcacoes.length >= 1)
          .map(({ dataDia, marcacoes, idFrequencia }) =>
            new Array().concat(
              ...marcacoes.map(({ hrEntrada }) => ({
                ...hrEntrada,
                dataDia,
                idFrequencia,
              })),
              ...marcacoes.map(({ hrSaida }) => ({
                ...hrSaida,
                dataDia,
                idFrequencia,
              }))
            )
          )
      )
      .map(({ id, dataDia, horaMarcacao }) => ({
        id,
        dataMarcacao: `${dataDia} ${horaMarcacao}`,
        observacao: "Aprovação em Lote",
        usuarioAtualizacao: 8454,
        usuarioValidador: 8454,
      }));

    const abonosParaValidar = new Array().concat(
      ...marcacoes
        .filter(({ abonos }) => abonos.length >= 1)
        .map(({ abonos, idFrequencia }) =>
          new Array().concat(...abonos.map((obj) => ({ ...obj, idFrequencia })))
        )
    );
    console.log("abonosParaValidar", abonosParaValidar);

    await srfApi
      .put(`/marcacoes/validadas`, frequenciasParaValidar)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));

    const outrasFaltas = abonosParaValidar
      .filter(
        ({ descJustificativa, validado }) =>
          descJustificativa === "OUTRAS FALTAS" && validado === false
      )
      .map((obj) => ({
        ...obj,
        observacao: "Aprovação em Lote",
        manifestacao: true,
        anexarNovamente: true,
      }));

    await Promise.all(
      outrasFaltas.map((obj) => {
        console.log(obj);
        srfApi
          .put("/abonos/aprovarAtestadoMedicoOrOutrasFaltas", obj)
          .then((res) => console.log(res))
          .catch((res) => console.log(res));
      })
    );
    await srfApi
      .put(`/abonos/aprovarAbonoEmLote`, abonosParaValidar)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));

    await Promise.all(
      frequencias.map(({ matricula, id }) =>
        srfApi
          .put(`/frequencias/validar`, id)
          .then((res) => {
            toast({
              title: `Matrícula ${matricula} - Frequência validada`,
              status: "success",
              duration: 5000,
              isClosable: false,
              position,
            });
          })
          .catch((err) => {
            toast({
              title: `Matrícula ${matricula} - ${err.response.data.message}`,
              status: "error",
              duration: 5000,
              isClosable: false,
              position,
            });
          })
      )
    );
    formBuscarFrequencias.setLoaded();
  };

  useEffect(() => {
    const { data, status } = session;
    if (status && status === "authenticated") {
      setAuthHeaders(data.user);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Validar Frequências - SRF Helper</title>
      </Head>
      <Box>
        <Flex mb={4}>
          <Heading size="lg" color="primary.600">
            Validar Frequências
          </Heading>
        </Flex>
        <Stack
          as={chakra.form}
          onSubmit={formBuscarFrequencias.handleSubmit(onSubmit)}
          p={5}
          bg="whiteAlpha.900"
          rounded="lg"
          shadow="lg"
          spacing={4}
        >
          <InputBox
            id="mesAno"
            label="Mês/Ano"
            type="month"
            formControl={formBuscarFrequencias.control}
          />
          <ChakraTagInput
            id="matriculas"
            label="Matrículas"
            placeholder="Matrículas separadas por vírgula"
            formControl={formBuscarFrequencias.control}
            required="Digite e pressione ENTER para adicionar"
          />
          <Box alignSelf="flex-end" pt={2}>
            <Button
              type="submit"
              colorScheme="primary"
              isDisabled={!formBuscarFrequencias.validation}
              isLoading={formBuscarFrequencias.isLoading}
              loadingText="Aguarde..."
            >
              Buscar
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

Home.dashboard = true;
Home.auth = true;
