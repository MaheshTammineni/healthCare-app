import {Injectable, Pipe, PipeTransform } from '@angular/core'; 
@Pipe({ 
  name: 'sortList' 
}) 
@Injectable() 
export class SortListPipe implements PipeTransform { 
  transform(value: any, args?: any): any { 
        if (typeof args[0] === "undefined") { 
                return value; 
        } 
        let direction = args[0][0]; 
        let column = args.replace('-',''); 
        value.sort((a: any, b: any) => { 
                let left = Number(new Date(a[column])); 
                let right = Number(new Date(b[column])); 
                return (direction === "-") ? right - left : left - right; 
        }); 
        return value; 
    } 
} 
