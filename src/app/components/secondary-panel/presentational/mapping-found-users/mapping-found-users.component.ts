import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/auth/auth.interfaces';

@Component({
  selector: 'app-mapping-found-users',
  templateUrl: './mapping-found-users.component.html',
  styleUrls: ['./mapping-found-users.component.scss']
})
export class MappingFoundUsersComponent implements OnInit {
  @Input() users: User[];

  constructor() {}

  ngOnInit() {}
}
