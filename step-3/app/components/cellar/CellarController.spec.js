import { expect } from 'chai';
import app from '../../app';
import 'angular-mocks';
import CellarController from './CellarController';
import wineData from './test-data/wines';
import _ from 'lodash';

describe('Cellar Controller', () => {

  let extractRandProps = _.curryRight(_.omit, 2)(['rating', 'date']);
  let controller, $timeout, $evalAsync, $httpBackend, $log, $http;
  beforeEach(inject((_$timeout_, _$httpBackend_, _$log_, _$http_) => {
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    $http = _$http_;
    $httpBackend.whenGET('./data/wines.json').respond(200, JSON.stringify(wineData));
    $httpBackend.expectGET('./data/wines.json');
    controller = new CellarController($http, $log);
  }));

  it('should load wines', () => {
    $httpBackend.flush();
    controller.wines.length = 0;
    expect(controller.wines).to.deep.equal([]);
    controller.loadWines().then((wines) => {
      expect(wines.data).to.exist;
      expect(wines.data.length).to.equal(7);
      expect(wines.data.map(extractRandProps)).to.include(extractRandProps(controller.convertApiWine(wineData[0])));
    });
    // importance du placement du flush après le then
    $httpBackend.flush();
    expect($httpBackend.flush).to.throw();
  });

  it('should load wines at init', () => {
    expect(controller.wines).to.not.exist;
    $httpBackend.flush();
    expect(controller.wines).to.exist;
    expect(controller.wines.length).to.equal(7);
    expect(controller.wines.map(extractRandProps)).to.include(extractRandProps(controller.convertApiWine(wineData[0])));
    expect($httpBackend.flush).to.throw();
  });

  it('should set a new wine to be edited', () => {
    expect(controller.editedWine).to.not.exist;
    controller.editWine(wineData[0]);
    expect(controller.editedWine).to.exist;
    expect(controller.editedWine).to.equal(wineData[0]);
  });
});
