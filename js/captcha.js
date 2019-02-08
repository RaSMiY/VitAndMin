'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Captcha = function () {
	function Captcha(_ref) {
		var element = _ref.element;

		_classCallCheck(this, Captcha);

		this.element = element;
		this.form;
		this.isValid = false;

		this.initCaptcha();
	}

	//Initializing


	_createClass(Captcha, [{
		key: 'initCaptcha',
		value: function initCaptcha() {
			this.initForm();
			this.stylizeElement();
			this.element.innerHTML = '';
		}
	}, {
		key: 'initForm',
		value: function initForm() {
			if (this.element.parentElement.tagName === 'FORM') {
				this.form = this.element.parentElement;
				this.form.addEventListener('submit', this.handleSubmittingForm.bind(this));
			} else {
				throw new Error('The parent of the captcha element must be a form element.');
			}
		}
	}, {
		key: 'stylizeElement',
		value: function stylizeElement() {
			this.element.style.border = '1px solid #cccccc';
			this.element.style.width = '100px';
		}

		//Event Handlers

	}, {
		key: 'handleSubmittingForm',
		value: function handleSubmittingForm(event) {
			event.preventDefault();
			this.checkValidity();
			if (this.isValid === true) {
				return true;
			} else {
				event.stopImmediatePropagation();
				return false;
			}
		}

		//Methods

	}, {
		key: 'checkValidity',
		value: function checkValidity() {
			if (this.isValid === true) {
				this.enteredValidValue();
			} else if (this.isValid === false) {
				this.enteredInvalidValue();
			}
		}
	}, {
		key: 'enteredValidValue',
		value: function enteredValidValue() {
			this.element.style.border = '1px solid #00ff00';
			if (this.element.classList.contains('captcha_invalid')) {
				this.element.classList.remove('captcha_invalid');
			}
			if (!this.element.classList.contains('captcha_valid')) {
				this.element.classList.add('captcha_valid');
			}
		}
	}, {
		key: 'enteredInvalidValue',
		value: function enteredInvalidValue() {
			this.element.style.border = '1px solid #ff0000';
			if (this.element.classList.contains('captcha_valid')) {
				this.element.classList.remove('captcha_valid');
			}
			if (!this.element.classList.contains('captcha_invalid')) {
				this.element.classList.add('captcha_invalid');
			}
		}
	}, {
		key: 'resetClassNames',
		value: function resetClassNames() {
			if (this.element.classList.contains('captcha_valid')) {
				this.element.classList.remove('captcha_valid');
			}
			if (this.element.classList.contains('captcha_invalid')) {
				this.element.classList.remove('captcha_invalid');
			}
		}
	}, {
		key: 'resetStyling',
		value: function resetStyling() {
			this.element.style.border = '1px solid #000000';
		}
	}]);

	return Captcha;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCaptcha = function (_Captcha) {
	_inherits(BaseCaptcha, _Captcha);

	function BaseCaptcha(_ref) {
		var element = _ref.element;

		_classCallCheck(this, BaseCaptcha);

		var _this = _possibleConstructorReturn(this, (BaseCaptcha.__proto__ || Object.getPrototypeOf(BaseCaptcha)).call(this, { element: element }));

		_this.canvas;
		_this.context;
		_this.code;
		_this.input;
		_this.enteredValue;

		_this.initBaseCaptcha();
		return _this;
	}

	//Initializing


	_createClass(BaseCaptcha, [{
		key: 'initBaseCaptcha',
		value: function initBaseCaptcha() {
			this.generateCode();
			this.generateCanvas();
			this.writeCode();
			this.appendCanvas();
			this.generateInputElement();
			this.appendInputElement();
			this.addResetButton();

			this.resetButton.addEventListener('click', this.handleClickResetButton.bind(this));
		}
	}, {
		key: 'generateCanvas',
		value: function generateCanvas() {
			this.canvas = document.createElement('canvas');
			this.canvas.style.width = '100px';
			this.canvas.style.height = '50px';
		}
	}, {
		key: 'appendCanvas',
		value: function appendCanvas() {
			this.element.appendChild(this.canvas);
		}
	}, {
		key: 'getContext',
		value: function getContext() {
			this.context = this.canvas.getContext('2d');
		}
	}, {
		key: 'generateInputElement',
		value: function generateInputElement() {
			var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('placeholder', 'Enter the code above here');
			input.setAttribute('class', 'captcha-base__input');
			input.style.display = 'block';
			this.input = input;
		}
	}, {
		key: 'appendInputElement',
		value: function appendInputElement() {
			if (this.element.nextSibling !== null) {
				this.form.insertBefore(this.input, this.element.nextSibling);
			} else {
				this.form.appendChild(this.input);
			}
		}
	}, {
		key: 'addResetButton',
		value: function addResetButton() {
			var resetButton = document.createElement('button');
			resetButton.innerHTML = '&#8635;';
			resetButton.setAttribute('class', 'captcha-base__reset');
			resetButton.setAttribute('type', 'reset');
			this.form.insertBefore(resetButton, this.input);
			this.resetButton = resetButton;
		}

		//Event Handlers

	}, {
		key: 'handleClickResetButton',
		value: function handleClickResetButton(event) {
			event.preventDefault();
			this.clearCanvas();
			this.generateCode();
			this.writeCode();
			this.input.value = '';
			this.resetStyling();
			this.resetClassNames();
			console.log('resseted');
		}

		//Methods

	}, {
		key: 'generateCode',
		value: function generateCode() {
			this.code = this.generateRandomNum(100000, 999999);
		}
	}, {
		key: 'writeCode',
		value: function writeCode() {
			this.getContext();
			this.context.font = '80px Arial';
			var codeString = this.code.toString();
			var textColor = void 0;
			for (var i = 0; i < 6; i++) {
				this.context.fillStyle = this.getRandomColor();
				this.transformContext(i);
				this.context.fillText(codeString[i], i * 52, 110);
				this.resetTransformation();
			}
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}, {
		key: 'checkValidity',
		value: function checkValidity() {
			var inputValue = parseInt(this.input.value);
			this.enteredValue = inputValue;

			if (this.enteredValue === this.code) {
				this.isValid = true;
			} else {
				this.isValid = false;
			}
			_get(BaseCaptcha.prototype.__proto__ || Object.getPrototypeOf(BaseCaptcha.prototype), 'checkValidity', this).call(this);
		}
	}, {
		key: 'enteredValidValue',
		value: function enteredValidValue() {
			_get(BaseCaptcha.prototype.__proto__ || Object.getPrototypeOf(BaseCaptcha.prototype), 'enteredValidValue', this).call(this);
			if (this.input.classList.contains('captcha-base__input_invalid')) {
				this.input.classList.remove('captcha-base__input_invalid');
			}
			if (!this.input.classList.contains('captcha-base__input_valid')) {
				this.input.classList.add('captcha-base__input_valid');
			}
		}
	}, {
		key: 'enteredInvalidValue',
		value: function enteredInvalidValue() {
			_get(BaseCaptcha.prototype.__proto__ || Object.getPrototypeOf(BaseCaptcha.prototype), 'enteredInvalidValue', this).call(this);
			if (this.input.classList.contains('captcha-base__input_valid')) {
				this.input.classList.remove('captcha-base__input_valid');
			}
			if (!this.input.classList.contains('captcha-base__input_invalid')) {
				this.input.classList.add('captcha-base__input_invalid');
			}
		}
	}, {
		key: 'resetClassNames',
		value: function resetClassNames() {
			_get(BaseCaptcha.prototype.__proto__ || Object.getPrototypeOf(BaseCaptcha.prototype), 'resetClassNames', this).call(this);
			if (this.input.classList.contains('captcha-base__input_valid')) {
				this.input.classList.remove('captcha-base__input_valid');
			}
			if (this.input.classList.contains('captcha-base__input_invalid')) {
				this.input.classList.remove('captcha-base__input_invalid');
			}
		}

		//Helpers

	}, {
		key: 'generateRandomNum',
		value: function generateRandomNum(min, max) {
			var result = min - 0.5 + Math.random() * (max - min + 1);
			return Math.round(result);
		}
	}, {
		key: 'getRandomColor',
		value: function getRandomColor() {
			var color = null;
			var randomNum = void 0;
			for (var i = 0; i < 3; i++) {
				randomNum = this.generateRandomNum(50, 230);
				color ? color = '#' + parseInt(randomNum, 16) : color += parseInt(randomNum, 16);
			}
			return color;
		}
	}, {
		key: 'getRadiansFromDegrees',
		value: function getRadiansFromDegrees(degrees) {
			return Math.PI / 180 * degrees;
		}
	}, {
		key: 'transformContext',
		value: function transformContext(index) {
			var degrees = this.generateRandomNum(0, 13);
			if (index % 2 === 0) {
				degrees = -degrees;
			}
			var radians = this.getRadiansFromDegrees(degrees);
			this.context.rotate(radians);
		}
	}, {
		key: 'resetTransformation',
		value: function resetTransformation() {
			this.context.setTransform(1, 0, 0, 1, 0, 0);
		}
	}]);

	return BaseCaptcha;
}(Captcha);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var captchaApp = function () {
        function captchaApp() {
            _classCallCheck(this, captchaApp);

            this.baseElements = document.getElementsByClassName('captcha-base');

            this.init();
        }

        _createClass(captchaApp, [{
            key: 'init',
            value: function init() {
                Array.prototype.forEach.call(this.baseElements, this.handleBaseElements.bind(this));
            }
        }, {
            key: 'handleBaseElements',
            value: function handleBaseElements(element) {
                new BaseCaptcha({
                    element: element
                });
            }
        }]);

        return captchaApp;
    }();

    new captchaApp();
})();
