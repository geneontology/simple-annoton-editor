
export default class FormGridService {
  constructor($timeout, lookup) {
    this.$timeout = $timeout;
    this.lookup = lookup;

    this.gridApi = null;
    this.columnDefs = [{
      name: 'label',
      displayName: '',
      width: 200,
      field: 'label',
      resizable: false,
      cellTemplate: './grid-templates/label-cell-template.html',
      headerCellTemplate: './grid-templates/header-cell-template.html',
      cellTooltip: function (row, col) {
        return row.entity.tooltip ? row.entity.tooltip : row.entity.label;
      },
      enableCellSelection: false,
      enableCellEditOnFocus: false,
      enableSorting: false,
      allowCellFocus: false,
      enableHiding: false,
      enableColumnMenu: false
    }, {
      name: 'term',
      displayName: 'Term',
      width: 200,
      field: 'term',
      resizable: false,
      cellTemplate: './grid-templates/term-cell-template.html',
      headerCellTemplate: './grid-templates/header-cell-template.html',
      enableCellEdit: false,
      enableCellSelection: false,
      enableCellEditOnFocus: false,
      enableSorting: false,
      allowCellFocus: false,
      enableHiding: false,
      enableColumnMenu: false
    }, {
      name: 'Evidence',
      field: 'Evidence.label',
      originalName: 'Evidence',
      displayName: 'Evidence',
      minWidth: 200,
      cellTemplate: './grid-templates/evidence-cell-template.html',
      headerCellTemplate: './grid-templates/header-cell-template.html',
      enableCellEdit: false,
      enableCellSelection: false,
      enableCellEditOnFocus: false,
      enableSorting: false,
      allowCellFocus: false,
      enableHiding: false,
      enableColumnMenu: false
    }, {
      name: 'reference',
      displayName: 'Reference',
      width: 120,
      field: 'reference',
      resizable: false,
      cellTemplate: './grid-templates/reference-cell-template.html',
      headerCellTemplate: './grid-templates/header-cell-template.html',
      enableCellEdit: false,
      enableCellSelection: false,
      enableCellEditOnFocus: false,
      enableSorting: false,
      allowCellFocus: false,
      enableHiding: false,
      enableColumnMenu: false
    }, {
      name: 'with',
      displayName: 'With',
      width: 120,
      field: 'with',
      resizable: false,
      cellTemplate: './grid-templates/with-cell-template.html',
      headerCellTemplate: './grid-templates/header-cell-template.html',
      enableCellEdit: false,
      enableCellSelection: false,
      enableCellEditOnFocus: false,
      enableSorting: false,
      allowCellFocus: false,
      enableHiding: false,
      enableColumnMenu: false
    }];

    this.gridOptions = {
      rowHeight: 41,
      width: 100,
      minWidth: 100,
      enableCellSelection: false,
      // rowEditWaitInterval: -1,
      enableCellEdit: false,
      enableCellEditOnFocus: false,
      multiSelect: false,
      rowTemplate: './grid-templates/row-template.html',
      showTreeExpandNoChildren: false,
      // keyDownOverrides: [{keyCode: 27}]
      columnDefs: this.columnDefs
    };

  }

  registerApi() {
    const self = this;
    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;

      self.$timeout(function () {
        self.gridApi.core.handleWindowResize();
      }, 0);
    };
  }

  /**
   *  Populates the tree grid with GO Terms, MF, CC, BP as roots
   */
  initalizeForm() {
    const self = this;
    let data = [{
      'label': 'Molecular Function',
      'term': {
        'control': {
          'placeholder': '',
          'value': ''
        },
        'lookup': {
          'requestParams': this.lookup.requestParamsGP
        }
      },
      'evidence': '',
      'reference': '',
      'with': '',

      $$treeLevel: 0
    }, {
      'label': 'Has Input (Gene Product/Chemical)',
      'term': '',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 1
    }, {
      'label': 'Happens During (Temporal Phase)',
      'term': 'BP',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 1
    }, {
      'label': 'Biological Process',
      'term': 'BP',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 0
    }, {
      'label': 'Part Of (BP)',
      'term': 'BP',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 1
    }, {
      'label': 'Part Of (BP)',
      'term': 'BP',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 2
    }, {
      'label': 'Cellular Component',
      'term': 'CC',
      'value': '',
      $$treeLevel: 0
    }, {
      'label': 'Part Of (Cell Type)',
      'term': 'CL',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 1
    }, {
      'label': 'Part Of (Anatomy)',
      'term': '',
      'evidence': '',
      'reference': '',
      'with': '',
      $$treeLevel: 2
    }];

    self.gridOptions.data = data;


  }

  /**
   * Expands all nodes. Expanded state is the default on initialization 
   */
  expandAll() {
    const self = this;
    self.$timeout(function () {
      self.gridApi.treeBase.expandAllRows();
    });
  }

}
FormGridService.$inject = ['$timeout', '$rootScope', 'lookup'];

