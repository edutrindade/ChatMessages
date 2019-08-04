import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})

export class ChatGroupDeleteService{

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set ChatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }

    showModalDelete(Id: number){
        this._chatGroupListComponent.chatGroupId = Id;
        this._chatGroupListComponent.chatGroupDeleteModal.showModal();
    }


    onDeleteError($event: HttpErrorResponse) {
        if($event.status == 400){
            this.notifyMessage.error(`Não foi possível excluir o Grupo' + ${$event.status}`);
        }
        this.notifyMessage.error(`Não foi possível excluir o Grupo' + ${$event.status}`);
    }

    onDeleteSucess($event: any) {
        this.notifyMessage.success('Exclusão realizada com sucesso.')
        this._chatGroupListComponent.getChatGroups();
    }

}