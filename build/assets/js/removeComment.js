"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var removeBtn = document.querySelectorAll(".jsRemoveCommentBtn");

var handleRemoveComment = function handleRemoveComment(event) {
  var li = event.target.parentNode;
  li.parentNode.removeChild(li);
};

var removeComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(event) {
    var comment, videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            comment = event.target.value;
            videoId = window.location.href.split("/videos/")[1];
            _context.next = 4;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/remove-comment"),
              method: "POST",
              data: {
                comment: comment
              }
            });

          case 4:
            response = _context.sent;

            if (response.status === 200) {
              // comment가 database에 저장됐을 경우에만 removeComment하겠다.
              handleRemoveComment(event);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function removeComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

function init() {
  console.log(removeBtn.length);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = removeBtn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      item.onclick = removeComment;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

if (removeBtn) {
  init();
}