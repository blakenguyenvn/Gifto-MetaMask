
/**
 * @Package: Gifto MetaMask - Transfer Gifto coin with MetaMask
 * Create by: TuanNguyen
 jQuery(function($) {});
 */

	/*------------------------------------------
	DEFINE GIFTO METAMASK
	------------------------------------------*/
	function GIFTO_METAMASK (){
		
		this.web3 = null;
		this.wallet = null;

		// Checking if Web3 has been injected by the browser (Mist/MetaMask)
		if (typeof web3 !== 'undefined') {
			// Use Mist/MetaMask's provider
			this.web3 = new Web3(web3.currentProvider);
			
		} else {
			console.log('No web3? You should consider trying MetaMask!');
		}
	};
	/*------------------------------------------
    	CHECK EXIST WEB3
 	------------------------------------------*/
 	GIFTO_METAMASK.prototype.validateWeb3 = function () {
		if (typeof web3 == 'undefined') {
			this.showErrorMessage('Please install MetaMask extension on your browser!');
			return false;
		} else {
			return true;
		}
 	};
	/*------------------------------------------
    	GET AND SUBMIT GIFTO TRANSFER
 	------------------------------------------*/
	GIFTO_METAMASK.prototype.gwTransferGifto = function (form_id) {
		
		var $this = this;

		if ( form_id == undefined || form_id == null ) {
					
			console.error('Tranfer Gifto missing formId');
			return false;

		} else {

			var FormApi = document.getElementById(form_id);
			var formData = new FormData(FormApi);
			var requestApi = {
				to: null,
				value: 0,
				gasLimit: 2100,
				message: null
			};
			
			//== Get and validate Gas Limit
			if (formData.get('gifto_gas_limit') != null && typeof formData.get('gifto_gas_limit') == 'number') {
				requestApi.gasLimit = formData.get('gifto_gas_limit');
			}

			//== Get and validate Recipient Address
			if (formData.get('gifto_recipient_wallet_address').length == 0) {
				this.showErrorMessage('Please enter Recipient Wallet address!');
			} else if (formData.get('gifto_recipient_wallet_address').length < 42) {
				this.showErrorMessage('Please enter Right Recipient Wallet address!');
			}
			requestApi.to = formData.get('gifto_recipient_wallet_address');

			//== Get and validate Amount
			if (formData.get('gifto_amount') <= 0) {
				this.showErrorMessage('Please enter amount of Gifto to send!');
			}
			requestApi.value = formData.get('gifto_amount');

			//== Get and validate Message
			requestApi.message = formData.get('gifto_message');

			if (this.validateWeb3() && requestApi.to != null && requestApi.value > 0) {

				this.web3.eth.getAccounts(function (err, accounts) {
				
					if (accounts.length == 0) {
						
						$this.showErrorMessage('Please sign in or create your MetaMask account !');

					} else {
						console.log(accounts);
						var wallet = accounts[0];
						var metamaskObj = {
							"from": wallet,
							"to": requestApi.to,
							"value": requestApi.value,
							"data": requestApi.message,
							"chainId":1
						};
						web3.eth.sendTransaction(metamaskObj, function(err, transactionHash){
							if (err) {
								$this.showErrorMessage(err);
							} else {
								console.log(transactionHash);
							}
						});
					}
		        });
			}
			
			

			return true;
		}
	};
	/*------------------------------------------
    	SEND TRANSACTION
 	------------------------------------------*/
	/*------------------------------------------
    	SHOW ERROR MESSAGE
 	------------------------------------------*/
	GIFTO_METAMASK.prototype.showErrorMessage = function (message){
		UIkit.notification({message: message, status: 'danger'});
	};