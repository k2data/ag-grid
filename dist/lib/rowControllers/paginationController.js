/**
 * ag-grid - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v6.3.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var utils_1 = require("../utils");
var gridOptionsWrapper_1 = require("../gridOptionsWrapper");
var context_1 = require("../context/context");
var gridPanel_1 = require("../gridPanel/gridPanel");
var selectionController_1 = require("../selectionController");
var sortController_1 = require("../sortController");
var eventService_1 = require("../eventService");
var events_1 = require("../events");
var filterManager_1 = require("../filter/filterManager");
var constants_1 = require("../constants");
var template = '<div class="ag-paging-panel ag-font-style">' +
    '<span id="pageRowSummaryPanel" class="ag-paging-row-summary-panel" style="display:none">' +
    '<span id="firstRowOnPage"></span>' +
    ' [TO] ' +
    '<span id="lastRowOnPage"></span>' +
    ' [OF] ' +
    '<span id="recordCount"></span>' +
    '</span>' +
    '<span class="ag-paging-page-summary-panel" style="float:right;line-height:30px;">' +
    '<button type="button" class="ag-paging-button" id="btFirst">[FIRST]</i></button>' +
    '<button type="button" class="ag-paging-button" id="btPrevious">[PREVIOUS]</button>' +
    //'[PAGE] '+
    //'<span id="current"></span>'+
    '<input id="current" style="width:30px;height:20px;text-align:center;line-height:20px;color:#666"/>' +
    ' [OF] ' +
    '<span id="total"></span>' +
    '<button type="button" class="ag-paging-button" id="btNext">[NEXT]</button>' +
    '<button type="button" class="ag-paging-button" id="btLast">[LAST]</button>' +
    '</span>' +
    '</div>';
var templateLg = '<div class="ag-paging-panel ag-font-style">' +
    '<span id="pageRowSummaryPanel" class="ag-paging-row-summary-panel" style="display:none">' +
    '<span id="firstRowOnPage"></span>' +
    ' [TO] ' +
    '<span id="lastRowOnPage"></span>' +
    ' [OF] ' +
    '<span id="recordCount"></span>' +
    '</span>' +
    '<span class="ag-paging-page-summary-panel ag-grid-k2-page-controll" style="float:right;line-height:30px;">' +
    '<button type="button" class="ag-paging-button" id="btFirst">[FIRST]</button>' +
    '<button type="button" class="ag-paging-button" id="btPrevious">[PREVIOUS]</button>' +
    '<button class="ag-paging-show-more" id="agGridControllBack" style="display: none">...</button>' +
    '<ul id="agGridK2Controll">' +
    '</ul>' +
    '<button class="ag-paging-show-more" id="agGridControllLoad">...</button>' +
    '<span id="current" style="display:none"></span>' +
    '<span id="total" style="display:none"></span>' +
    '<button type="button" class="ag-paging-button" id="btNext">[NEXT]</button>' +
    '<button type="button" class="ag-paging-button" id="btLast">[LAST]</button>' +
    '</span>' +
    '</div>';
var PaginationController = (function () {
    function PaginationController() {
        this.currentClick = function (value) {
            this.currentPage = value - 1;
            this.loadPage();
        };
    }
    PaginationController.prototype.init = function () {
        var _this = this;
        // if we are doing pagination, we are guaranteed that the model type
        // is normal. if it is not, then this paginationController service
        // will never be called.
        if (this.rowModel.getType() === constants_1.Constants.ROW_MODEL_TYPE_NORMAL) {
            this.inMemoryRowModel = this.rowModel;
        }
        this.setupComponents();
        this.callVersion = 0;
        var paginationEnabled = this.gridOptionsWrapper.isRowModelPagination();
        this.eventService.addEventListener(events_1.Events.EVENT_FILTER_CHANGED, function () {
            if (paginationEnabled && _this.gridOptionsWrapper.isEnableServerSideFilter()) {
                _this.reset(false);
            }
        });
        this.eventService.addEventListener(events_1.Events.EVENT_SORT_CHANGED, function () {
            if (paginationEnabled && _this.gridOptionsWrapper.isEnableServerSideSorting()) {
                _this.reset(false);
            }
        });
        if (paginationEnabled && this.gridOptionsWrapper.getDatasource()) {
            this.setDatasource(this.gridOptionsWrapper.getDatasource());
        }
    };
    PaginationController.prototype.setDatasource = function (datasource) {
        this.datasource = datasource;
        if (!datasource) {
            // only continue if we have a valid datasource to work with
            return;
        }
        this.reset(true);
    };
    PaginationController.prototype.checkForDeprecated = function () {
        var ds = this.datasource;
        if (utils_1.Utils.exists(ds.pageSize)) {
            console.error('ag-Grid: since version 5.1.x, pageSize is replaced with grid property paginationPageSize');
        }
    };
    PaginationController.prototype.pageActive = function (num) {
        if (num > 0 && num < (this.totalPages + 1)) {
            var pages = Math.ceil(this.totalPages / 5);
            var agGridControllLoad = document.querySelector('#agGridControllLoad');
            var agGridControllBack = document.querySelector('#agGridControllBack');
            var agGridK2Controll = document.querySelector('#agGridK2Controll');
            var currentView = Math.ceil(num / 5);
            agGridK2Controll.innerHTML = '';
            for (var i = 0; i < 5; i++) {
                var liTemp = document.createElement('li');
                var content = (currentView - 1) * 5 + i + 1;
                liTemp.innerHTML = content;
                if (num === content) {
                    liTemp.className = 'active';
                }
                if (content < (this.totalPages + 1)) {
                    agGridK2Controll.appendChild(liTemp);
                }
            }
            if (currentView > 1) {
                agGridControllBack.style.display = 'inline-block';
            }
            if (currentView === pages) {
                agGridControllLoad.style.display = 'none';
            }
            if (currentView === 1) {
                agGridControllBack.style.display = 'none';
                agGridControllLoad.style.display = 'inline-block';
            }
            if (pages === 1) {
                agGridControllBack.style.display = 'none';
                agGridControllLoad.style.display = 'none';
            }
        }
    };
    ;
    PaginationController.prototype.reset = function (freshDatasource) {
        // important to return here, as the user could be setting filter or sort before
        // data-source is set
        if (utils_1.Utils.missing(this.datasource)) {
            return;
        }
        this.checkForDeprecated();
        // if user is providing id's, then this means we can keep the selection between datsource hits,
        // as the rows will keep their unique id's even if, for example, server side sorting or filtering
        // is done. if it's a new datasource, then always clear the selection.
        var userGeneratingRows = utils_1.Utils.exists(this.gridOptionsWrapper.getRowNodeIdFunc());
        var resetSelectionController = freshDatasource || !userGeneratingRows;
        if (resetSelectionController) {
            this.selectionController.reset();
        }
        // copy pageSize, to guard against it changing the the datasource between calls
        this.pageSize = this.gridOptionsWrapper.getPaginationPageSize();
        if (!(this.pageSize >= 1)) {
            this.pageSize = 100;
        }
        // see if we know the total number of pages, or if it's 'to be decided'
        if (typeof this.datasource.rowCount === 'number' && this.datasource.rowCount >= 0) {
            this.rowCount = this.datasource.rowCount;
            this.foundMaxRow = true;
            this.calculateTotalPages();
        }
        else {
            this.rowCount = 0;
            this.foundMaxRow = false;
            this.totalPages = null;
        }
        this.currentPage = 0;
        // hide the summary panel until something is loaded
        this.ePageRowSummaryPanel.style.visibility = 'hidden';
        this.setTotalLabels();
        this.loadPage();
    };
    // the native method number.toLocaleString(undefined, {minimumFractionDigits: 0}) puts in decimal places in IE
    PaginationController.prototype.myToLocaleString = function (input) {
        if (typeof input !== 'number') {
            return '';
        }
        else {
            // took this from: http://blog.tompawlak.org/number-currency-formatting-javascript
            return input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    };
    PaginationController.prototype.setTotalLabels = function () {
        if (this.foundMaxRow) {
            var that = this;
            var loadPages = function (total) {
                if (total) {
                    for (var i = 0; i < total; i++) {
                        var liTemp;
                        if (total < 6) {
                            liTemp = document.createElement('li');
                            liTemp.innerHTML = i + 1;
                            that.agGridK2Controll.appendChild(liTemp);
                            that.agGridControllLoad.style.display = 'none';
                            that.agGridControllBack.style.display = 'none';
                        }
                        else {
                            if (i < 5) {
                                liTemp = document.createElement('li');
                                liTemp.innerHTML = i + 1;
                                that.agGridK2Controll.appendChild(liTemp);
                                that.agGridControllBack.style.display = 'none';
                                that.agGridControllLoad.style.display = 'inline-block';
                            }
                        }
                        i === 0 ? liTemp.className = 'active' : '';
                    }
                }
                else {
                    that.agGridK2Controll.innerHTML = '...';
                }
            };
            if (that.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
                loadPages(this.totalPages);
            }
            this.lbTotal.innerHTML = this.myToLocaleString(this.totalPages);
            this.lbRecordCount.innerHTML = this.myToLocaleString(this.rowCount);
        }
        else {
            var moreText = this.gridOptionsWrapper.getLocaleTextFunc()('more', 'more');
            this.lbTotal.innerHTML = moreText;
            this.lbRecordCount.innerHTML = moreText;
        }
    };
    PaginationController.prototype.calculateTotalPages = function () {
        this.totalPages = Math.floor((this.rowCount - 1) / this.pageSize) + 1;
    };
    PaginationController.prototype.pageLoaded = function (rows, lastRowIndex) {
        var firstId = this.currentPage * this.pageSize;
        this.inMemoryRowModel.setRowData(rows, true, firstId);
        // see if we hit the last row
        if (!this.foundMaxRow && typeof lastRowIndex === 'number' && lastRowIndex >= 0) {
            this.foundMaxRow = true;
            this.rowCount = lastRowIndex;
            this.calculateTotalPages();
            this.setTotalLabels();
            // if overshot pages, go back
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages - 1;
                this.loadPage();
            }
        }
        this.enableOrDisableButtons();
        this.updateRowLabels();
    };
    PaginationController.prototype.updateRowLabels = function () {
        var startRow;
        var endRow;
        if (this.isZeroPagesToDisplay()) {
            startRow = 0;
            endRow = 0;
        }
        else {
            startRow = (this.pageSize * this.currentPage) + 1;
            endRow = startRow + this.pageSize - 1;
            if (this.foundMaxRow && endRow > this.rowCount) {
                endRow = this.rowCount;
            }
        }
        this.lbFirstRowOnPage.innerHTML = this.myToLocaleString(startRow);
        this.lbLastRowOnPage.innerHTML = this.myToLocaleString(endRow);
        // show the summary panel, when first shown, this is blank
        this.ePageRowSummaryPanel.style.visibility = "";
    };
    PaginationController.prototype.loadPage = function () {
        var _this = this;
        this.enableOrDisableButtons();
        var startRow = this.currentPage * this.pageSize;
        var endRow = (this.currentPage + 1) * this.pageSize;
        this.lbCurrent.value = this.myToLocaleString(this.currentPage + 1);
        this.callVersion++;
        var callVersionCopy = this.callVersion;
        var that = this;
        this.gridPanel.showLoadingOverlay();
        var sortModel;
        if (this.gridOptionsWrapper.isEnableServerSideSorting()) {
            sortModel = this.sortController.getSortModel();
        }
        var filterModel;
        if (this.gridOptionsWrapper.isEnableServerSideFilter()) {
            filterModel = this.filterManager.getFilterModel();
        }
        var params = {
            startRow: startRow,
            endRow: endRow,
            successCallback: successCallback,
            failCallback: failCallback,
            sortModel: sortModel,
            filterModel: filterModel,
            context: this.gridOptionsWrapper.getContext()
        };
        // check if old version of datasource used
        var getRowsParams = utils_1.Utils.getFunctionParameters(this.datasource.getRows);
        if (getRowsParams.length > 1) {
            console.warn('ag-grid: It looks like your paging datasource is of the old type, taking more than one parameter.');
            console.warn('ag-grid: From ag-grid 1.9.0, now the getRows takes one parameter. See the documentation for details.');
        }
        // put in timeout, to force result to be async
        setTimeout(function () {
            _this.datasource.getRows(params);
        }, 0);
        function successCallback(rows, lastRowIndex) {
            if (that.isCallDaemon(callVersionCopy)) {
                return;
            }
            that.pageLoaded(rows, lastRowIndex);
        }
        function failCallback() {
            if (that.isCallDaemon(callVersionCopy)) {
                return;
            }
            // set in an empty set of rows, this will at
            // least get rid of the loading panel, and
            // stop blocking things
            that.inMemoryRowModel.setRowData([], true);
        }
    };
    PaginationController.prototype.isCallDaemon = function (versionCopy) {
        return versionCopy !== this.callVersion;
    };
    PaginationController.prototype.onBtNext = function () {
        this.currentPage = this.currentPage ? this.currentPage : this.lbCurrent.value - 1;
        this.currentPage++;
        if (this.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
            this.pageActive(this.currentPage + 1);
        }
        this.loadPage();
    };
    PaginationController.prototype.onBtPrevious = function () {
        this.currentPage = this.currentPage ? this.currentPage : this.lbCurrent.value - 1;
        this.currentPage--;
        if (this.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
            this.pageActive(this.currentPage + 1);
        }
        ;
        this.loadPage();
    };
    PaginationController.prototype.onBtFirst = function () {
        this.currentPage = 0;
        if (this.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
            this.pageActive(1);
        }
        ;
        this.loadPage();
    };
    PaginationController.prototype.onBtLast = function () {
        this.currentPage = this.totalPages - 1;
        if (this.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
            this.pageActive(this.totalPages);
        }
        ;
        this.loadPage();
    };
    PaginationController.prototype.onInput = function (event) {
        var reg = /^\+?[1-9][0-9]*$/;
        this.currentPage = parseInt(event.target.value) - 1;
        if (event.target.value !== '' && reg.test(event.target.value)) {
            this.loadPage();
        }
    };
    PaginationController.prototype.isZeroPagesToDisplay = function () {
        return this.foundMaxRow && this.totalPages === 0;
    };
    PaginationController.prototype.enableOrDisableButtons = function () {
        var disablePreviousAndFirst = this.currentPage === 0;
        this.btPrevious.disabled = disablePreviousAndFirst;
        this.btFirst.disabled = disablePreviousAndFirst;
        var zeroPagesToDisplay = this.isZeroPagesToDisplay();
        var onLastPage = this.foundMaxRow && this.currentPage === (this.totalPages - 1);
        var disableNext = onLastPage || zeroPagesToDisplay;
        this.btNext.disabled = disableNext;
        var disableLast = !this.foundMaxRow || zeroPagesToDisplay || this.currentPage === (this.totalPages - 1);
        this.btLast.disabled = disableLast;
    };
    PaginationController.prototype.createTemplate = function () {
        var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
        var pageType = this.gridOptionsWrapper.gridOptions.localeText.pageType;
        if (pageType && pageType === 'pageLg') {
            return templateLg
                .replace('[PAGE]', localeTextFunc('page', 'Page'))
                .replace('[TO]', localeTextFunc('to', 'to'))
                .replace('[OF]', localeTextFunc('of', 'of'))
                .replace('[OF]', localeTextFunc('of', 'of'))
                .replace('[FIRST]', localeTextFunc('first', 'First'))
                .replace('[PREVIOUS]', localeTextFunc('previous', 'Previous'))
                .replace('[NEXT]', localeTextFunc('next', 'Next'))
                .replace('[LAST]', localeTextFunc('last', 'Last'));
        }
        else {
            return template
                .replace('[PAGE]', localeTextFunc('page', 'Page'))
                .replace('[TO]', localeTextFunc('to', 'to'))
                .replace('[OF]', localeTextFunc('of', 'of'))
                .replace('[OF]', localeTextFunc('of', 'of'))
                .replace('[FIRST]', localeTextFunc('first', 'First'))
                .replace('[PREVIOUS]', localeTextFunc('previous', 'Previous'))
                .replace('[NEXT]', localeTextFunc('next', 'Next'))
                .replace('[LAST]', localeTextFunc('last', 'Last'));
        }
    };
    PaginationController.prototype.getGui = function () {
        return this.eGui;
    };
    PaginationController.prototype.setupComponents = function () {
        this.eGui = utils_1.Utils.loadTemplate(this.createTemplate());
        this.btNext = this.eGui.querySelector('#btNext');
        this.btPrevious = this.eGui.querySelector('#btPrevious');
        this.btFirst = this.eGui.querySelector('#btFirst');
        this.btLast = this.eGui.querySelector('#btLast');
        this.lbCurrent = this.eGui.querySelector('#current');
        this.lbTotal = this.eGui.querySelector('#total');
        this.lbRecordCount = this.eGui.querySelector('#recordCount');
        this.lbFirstRowOnPage = this.eGui.querySelector('#firstRowOnPage');
        this.lbLastRowOnPage = this.eGui.querySelector('#lastRowOnPage');
        this.ePageRowSummaryPanel = this.eGui.querySelector('#pageRowSummaryPanel');
        this.agGridK2Controll = this.eGui.querySelector('#agGridK2Controll');
        this.agGridControllLoad = this.eGui.querySelector('#agGridControllLoad');
        this.agGridControllBack = this.eGui.querySelector('#agGridControllBack');
        var that = this;
        this.btNext.addEventListener('click', function () {
            that.onBtNext();
        });
        this.btPrevious.addEventListener('click', function () {
            that.onBtPrevious();
        });
        this.btFirst.addEventListener('click', function () {
            that.onBtFirst();
        });
        this.btLast.addEventListener('click', function () {
            that.onBtLast();
        });
        if (this.gridOptionsWrapper.gridOptions.localeText.pageType === 'pageLg') {
            this.agGridK2Controll.addEventListener('click', function (e) {
                if (e.target.innerHTML && e.target.innerHTML.indexOf('<') === -1) {
                    var liArr = this.getElementsByTagName('li');
                    for (var i = 0, len = liArr.length; i < len; i++) {
                        liArr[i].className = '';
                    }
                    e.target.className = 'active';
                    that.currentClick(new Number(e.target.innerHTML));
                }
            }, false);
            this.agGridControllLoad.addEventListener('click', function () {
                console.log('load...');
                var liArr = that.agGridK2Controll.getElementsByTagName('li');
                var currentIndex = new Number(liArr[liArr.length - 1].innerHTML);
                var currentPage = Math.ceil(currentIndex / 5);
                var pages = Math.ceil(that.totalPages / 5);
                if (currentIndex < that.totalPages) {
                    that.agGridControllBack.style.display = 'inline-block';
                    that.pageActive(currentIndex + 1);
                    that.currentClick(new Number(currentIndex + 1));
                }
                if (currentPage === pages - 1) {
                    this.style.display = 'none';
                }
            }, false);
            this.agGridControllBack.addEventListener('click', function () {
                console.log('back...');
                var liArr = that.agGridK2Controll.getElementsByTagName('li');
                var currentIndex = new Number(liArr[0].innerHTML);
                var currentPage = Math.ceil(currentIndex / 5);
                var pages = Math.ceil(that.totalPages / 5);
                if (currentIndex < that.totalPages) {
                    that.agGridControllLoad.style.display = 'inline-block';
                    that.pageActive(currentIndex - 1);
                    that.currentClick(new Number(currentIndex - 1));
                }
                if (currentPage - 1 === 1) {
                    this.style.display = 'none';
                }
            }, false);
        }
        else {
            this.lbCurrent.addEventListener('keyup', function () {
                that.onInput(event);
            });
        }
    };
    __decorate([
        context_1.Autowired('filterManager'), 
        __metadata('design:type', filterManager_1.FilterManager)
    ], PaginationController.prototype, "filterManager", void 0);
    __decorate([
        context_1.Autowired('gridPanel'), 
        __metadata('design:type', gridPanel_1.GridPanel)
    ], PaginationController.prototype, "gridPanel", void 0);
    __decorate([
        context_1.Autowired('gridOptionsWrapper'), 
        __metadata('design:type', gridOptionsWrapper_1.GridOptionsWrapper)
    ], PaginationController.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        context_1.Autowired('selectionController'), 
        __metadata('design:type', selectionController_1.SelectionController)
    ], PaginationController.prototype, "selectionController", void 0);
    __decorate([
        context_1.Autowired('sortController'), 
        __metadata('design:type', sortController_1.SortController)
    ], PaginationController.prototype, "sortController", void 0);
    __decorate([
        context_1.Autowired('eventService'), 
        __metadata('design:type', eventService_1.EventService)
    ], PaginationController.prototype, "eventService", void 0);
    __decorate([
        context_1.Autowired('rowModel'), 
        __metadata('design:type', Object)
    ], PaginationController.prototype, "rowModel", void 0);
    __decorate([
        context_1.PostConstruct, 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], PaginationController.prototype, "init", null);
    PaginationController = __decorate([
        context_1.Bean('paginationController'), 
        __metadata('design:paramtypes', [])
    ], PaginationController);
    return PaginationController;
})();
exports.PaginationController = PaginationController;
