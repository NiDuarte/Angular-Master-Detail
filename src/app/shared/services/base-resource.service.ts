import { BaseResourceModel } from "../models/base-resource.model";

import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";


export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string, 
    protected injector: Injector, 
    protected jsonDataToResourceFn: (jsonData: any) => T
  ){
    this.http = injector.get(HttpClient);    
  }

  getAll(): Observable<T[]> {
   //let urlfim = this.apiPath;
     let urlfim = this.geturl()+"?user_id=aline_duarte";
    

  console.log(this.http.get(urlfim).pipe(
    map(this.jsonDataToResources.bind(this)),
    catchError(this.handleError)
  ));
    return this.http.get(urlfim).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<T> {
   // let urlfim = `${this.apiPath}/${id}`;
    let urlfim = `${this.geturl()}/${id}?user_id=aline_duarte`;
    const url = `${this.apiPath}/${id}`;

    return this.http.get(urlfim).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)      
    )
  }

  create(resource: T): Observable<T> {
   //  let urlfim = this.apiPath;
   let urlfim = this.geturl();
    let asd = resource;
    asd.user_id="aline_duarte";
    

  console.log("sd"+asd.id)

  return this.http.post(this.geturl(), asd).pipe(
    map(this.jsonDataToResource.bind(this)),
    catchError(this.handleError)
  )
    
  }

  update(resource: T): Observable<T> {
   // let urlfim = `${this.apiPath}/${resource.id}`
      let urlfim = this.geturl();
      let asd = resource;
    asd.user_id="aline_duarte";
    console.log(asd)
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(urlfim, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
   //  const url = `${this.apiPath}/${id}`;
   const url = `${this.geturl()}/?user_id=aline_duarte&id=${id}`
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    )
  }

  

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push( this.jsonDataToResourceFn(element) )
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }

  geturl(){
    let urlf = this.apiPath.substr(4)=="categories"?"categorias":"lancamentos";
    urlf="https://p38yx781aa.execute-api.us-east-1.amazonaws.com/Stage/"+urlf
    return urlf;
  }

}