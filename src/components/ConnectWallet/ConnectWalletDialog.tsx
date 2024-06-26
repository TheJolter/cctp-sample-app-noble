import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import IconMetaMask from 'assets/icon-metamask.png'
import IconKeplr from 'assets/Keplr_icon_ver.1.3_2.png'
import ConnectWalletDialogButton from 'components/ConnectWallet/ConnectWalletDialogButton'
import { injected } from 'components/Wallet/Connectors'

import type { SxProps } from '@mui/material'
import type { AbstractConnector } from '@web3-react/abstract-connector'

import { observer } from 'mobx-react-lite'
import { useStore } from 'stores/hooks'

interface Props {
  handleClose: () => void
  handleConnect: (connector: AbstractConnector) => void
  open: boolean
  sx?: SxProps
  handleConnectKeplr?: () => void
}

const ConnectWalletDialog: React.FC<Props> = observer(({
  handleClose,
  handleConnect,
  open,
  sx = {},
  handleConnectKeplr,
}) => {
  const chainStore = useStore('chainStore')
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogContent>
        {chainStore.fromChainType==='evm'&&<ConnectWalletDialogButton
          onClick={() => handleConnect(injected)}
          subtitle="Connect using MetaMask"
          title="MetaMask"
          imgSrc={IconMetaMask}
        />}
        {chainStore.fromChainType==='cosmos'&&<ConnectWalletDialogButton
          onClick={() => handleConnectKeplr?.()}
          subtitle="Connect using Keplr"
          title="Keplr"
          imgSrc={IconKeplr}
        />}
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
})

export default ConnectWalletDialog
