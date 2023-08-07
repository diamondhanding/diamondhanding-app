import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerProps,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { DiscordIcon } from '../icons/DiscordIcon';
import { SquareIconButton } from '../buttons/SquareIconButton';
import { GitHubIcon } from '../icons/GitHubIcon';
import { ConnectWalletButton } from '../buttons/ConnectWalletButton';

export const MobileDrawer = (props: Omit<DrawerProps, 'children'>) => (
  <Drawer placement="top" {...props}>
    <DrawerContent>
      <DrawerBody mt="12" mb="2" px="4">
        <Stack spacing="4" align="stretch">
          <ConnectWalletButton />
          <HStack spacing="4" justifyContent="center">
            <SquareIconButton aria-label="Discord" icon={<DiscordIcon />} />
            <SquareIconButton aria-label="GitHub" icon={<GitHubIcon />} />
          </HStack>
        </Stack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);