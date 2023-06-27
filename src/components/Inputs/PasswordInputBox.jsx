import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

/**
 * Cria uma Inpux Box de senha.
 * @method PasswordInputBox
 * @memberof module:Inputs
 * @param {String} id id do formulário
 * @param {Function} errors manipula as mensagens de erro
 * @param {Object} register define parâmetros de register
 * @param {*} required marca a Box como um campo obrigatório (true)
 * ou opcional (false) (padrão: "Obrigatório" - força o campo como
 * obrigatório, com o texto "Obrigatório")
 * @param {Object} validate validação
 * @param {Function} onChange transmite um callback após a validação
 * do campo
 * @returns {Component} componente estilizado com máscara
 */
export const PasswordInputBox = forwardRef(
  (
    {
      id,
      formControl: {
        trigger,
        formState: { errors },
        register,
        setValue,
      },
      required = "Obrigatório",
      validate,
      onChange,
      shadow = "md",
      ...props
    },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef(null);
    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
      onToggle();

      if (inputRef.current) {
        inputRef.current.focus({
          preventScroll: true,
        });
      }
    };

    return (
      <Box px={0.5}>
        <FormControl id={id} isInvalid={errors[id]}>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={isOpen ? "Mask password" : "Reveal password"}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={onClickReveal}
                _focus={{ background: "transparent" }}
              />
            </InputRightElement>
            <Input
              ref={mergeRef}
              type={isOpen ? "text" : "password"}
              autoComplete="current-password"
              {...register(id, {
                required: required,
                validate: validate,
                onChange: onChange,
              })}
              shadow={shadow}
              {...props}
            />
          </InputGroup>
          <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    );
  }
);
PasswordInputBox.displayName = "PasswordField";
