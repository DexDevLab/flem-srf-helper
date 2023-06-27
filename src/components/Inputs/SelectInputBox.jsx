import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Skeleton,
  // Select
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect } from "react";

/**
 * Cria uma Inpux Box de senha.
 * @method SelectInputBox
 * @memberof module:Inputs
 * @param {String} id id do formulário
 * @param {Function} errors manipula as mensagens de erro
 * @param {Object} label rótulo do Input Box
 * @param {Object} placeholder placeholder do box
 * @param {Object} register define parâmetros de register
 * @param {*} required marca a Box como um campo obrigatório (true)
 * ou opcional (false) (padrão: "Obrigatório" - força o campo como
 * obrigatório, com o texto "Obrigatório")
 * @param {Object} options opções disponíveis do checkbox, que são
 * passadas na forma de um array
 * @param {Boolean} isLoaded realiza a animação diretamente (true) ou
 * não. Caso seja colocado em false, deve ser transmitido um valor para
 * realizar o carregamento do Skeleton (padrão: true - ativa a animação
 * automaticamente)
 * @param {Function} onChange transmite um callback após a validação
 * do campo
 * @param {Object} value dados do formulário. Pode ser utilizado juntamente
 * com setValue para receber os valores por meio de função
 * @param {Function} setValue provê uma função que entrega dados do
 * formulário, de acordo com seu id.
 * @returns {Component} componente estilizado com máscara
 */
export function SelectInputBox({
  id,
  label,
  placeholder = "Selecione...",
  required = "Obrigatório",
  options,
  isLoaded = true,
  onChange,
  shadow = "md",
  formControl: {
    trigger,
    formState: { errors },
    register,
    setValue,
  },
  isMulti,
  colorScheme = "primary",
  bg,
  defaultValue,
  ...props
}) {
  const chakraStyles = {
    control: (provided, state) => ({
      ...provided,
      shadow: state.isFocused ? "inner" : shadow,
      bg: bg,
      _focus: {
        boxShadow: state.isFocused
          ? `0 0 0 1px var(--chakra-colors-${colorScheme}-500)`
          : errors[id]
          ? "0 0 0 1px #E53E3E"
          : `var(--chakra-shadows-${shadow})`,
        borderColor: state.isFocused
          ? `${colorScheme}.500`
          : errors[id]
          ? "#E53E3E"
          : "gray.200",
      },
    }),
  };
  useEffect(() => {
    console.log(typeof defaultValue);
    if (Array.isArray(defaultValue) || typeof defaultValue === "object") {
      setValue(id, isMulti ? defaultValue : defaultValue?.value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box px={0.5}>
      <FormControl id={id} isInvalid={errors[id]}>
        {label && <FormLabel>{label}</FormLabel>}
        <Skeleton isLoaded={isLoaded} fadeDuration={0.5}>
          <Select
            instanceId={id}
            placeholder={placeholder}
            {...register(id, {
              required: required,
              validate: (value) => {
                if (required === false) {
                  return true;
                } else {
                  return value?.length >= 1 || "Obrigatório";
                }
              },
            })}
            defaultValue={defaultValue}
            {...props}
            shadow={shadow}
            options={options}
            onChange={(e) => {
              setValue(id, isMulti ? e : e?.value);
              trigger(id);
            }}
            isMulti={isMulti}
            noOptionsMessage={() => "Sem opções"}
            closeMenuOnSelect={!isMulti}
            chakraStyles={chakraStyles}
          ></Select>
        </Skeleton>
        <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
