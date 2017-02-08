import { expect } from 'chai';
import app from '../../app';
import 'angular-mocks';
import CellarController from './CellarController';
import WineService from '../../services/WineService';
import wineData from '../../../data/wines';
import ratedWineData from '../../../data/ratedWines';
import _ from 'lodash';

describe('Cellar Controller', () => {

  let extractTransProps = _.curryRight(_.omit, 2)(['pic']);
  let controller, $timeout, $evalAsync, $httpBackend, $log, wineURL, WineResource;
  beforeEach(angular.mock.module('wine'));

  beforeEach(inject((_$timeout_, _$httpBackend_, _$log_, _wineURL_, _WineResource_) => {
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    $log = _$log_;
    wineURL = _wineURL_;
    WineResource = _WineResource_;
    $httpBackend.whenGET(wineURL.WINE_API).respond(200, JSON.stringify(wineData));
    $httpBackend.whenGET(`${wineURL.WINE_API}?rated=true`).respond(200, JSON.stringify(ratedWineData));
    $httpBackend.expectGET(`${wineURL.WINE_API}?rated=true`);
    controller = new CellarController($log, wineURL, new WineService(WineResource));
  }));

  it('should load wines', () => {
    $httpBackend.flush();
    controller.wines.length = 0;
    $httpBackend.expectGET(wineURL.WINE_API);
    let loadedWines = controller.loadWines();
    $httpBackend.flush();
    expect(loadedWines).to.exist;
    expect(loadedWines.length).to.equal(7);
    expect(loadedWines.map(extractTransProps).toString()).to.contain(extractTransProps(ratedWineData[0]).toString());
    expect($httpBackend.flush).to.throw();
  });

  it('should load my wines (ie: with a rating)', () => {
    $httpBackend.flush();
    controller.wines.length = 0;
    $httpBackend.expectGET(`${wineURL.WINE_API}?rated=true`);
    let myWines = controller.loadMyWines();
    $httpBackend.flush();
    expect(myWines).to.exist;
    expect(myWines.length).to.equal(2);
    expect(myWines.map(extractTransProps).toString()).to.contain(extractTransProps(ratedWineData[0]).toString());
    expect($httpBackend.flush).to.throw();
  });

  it('should load wines at init', () => {
    expect(controller.wines.length).to.equal(0);
    $httpBackend.flush();
    expect(controller.wines).to.exist;
    expect(controller.wines.length).to.equal(2);
    expect(controller.wines.map(extractTransProps).toString()).to.contain(extractTransProps(ratedWineData[0]).toString());
    expect($httpBackend.flush).to.throw();
  });

  it('should set a new wine to be edited', () => {
    expect(controller.editedWine).to.not.exist;
    controller.editWine(wineData[0]);
    expect(controller.editedWine).to.exist;
    // deep equal => ce n'est plus une egalite de ref
    expect(controller.editedWine).to.deep.equal(wineData[0]);
  });
});
