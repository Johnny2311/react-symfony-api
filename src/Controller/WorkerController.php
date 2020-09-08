<?php

namespace App\Controller;

use App\Repository\WorkerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

class WorkerController extends AbstractController
{
    private $workerRepository;
    private $helper;

    public function __construct(WorkerRepository $workerRepository, UploaderHelper $helper)
    {
        $this->workerRepository = $workerRepository;    
        $this->helper = $helper;
    }


    /**
     * @Route("/workers/photo/{id}", name="add_worker_photo", methods={"POST"})
     */    
    public function addPhoto($id, Request $request) : JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);
        $file = $request->files->get('photoFile');
        
        if (empty($worker))
            return new JsonResponse(['status' => 'Worker do not exists!'], JsonResponse::HTTP_BAD_REQUEST);

        $worker->setPhotoFile($file);
        $this->workerRepository->updateWorker($worker);

        return new JsonResponse(['status' => 'Photo added!'], JsonResponse::HTTP_OK);
    }


    /**
     * @Route("/workers", name="add_worker", methods={"POST"})
     */
    public function addWorker(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        //if is not set, assign null
        $name = $data['name'] ?? null;
        $birthdate = empty($data['birthdate']) ? null : new \DateTime($data['birthdate']);
        $address = $data['address'] ?? null;
        $phone = $data['phone'] ?? null;
        $email = $data['email'] ?? null;
        $dniNumber = $data['dniNumber'] ?? null;
        $deparment = $data['deparment'] ?? null;

        // $photoFile = $request->files->get('photoFile');

        if (empty($name) || empty($birthdate) || empty($address) ||
            empty($email) || empty($dniNumber) || empty($deparment)) 
            return new JsonResponse(['status' => 'Empty NOT NULL prameter'], JsonResponse::HTTP_BAD_REQUEST);

        $repetedDni = $this->workerRepository->findOneBy(['dniNumber' => $dniNumber]);
        if (!empty($repetedDni))
            return new JsonResponse(['status' => 'DNI number already present'], JsonResponse::HTTP_BAD_REQUEST);
        
        $this->workerRepository->saveWorker($name, $birthdate, $address, $phone, $email, $dniNumber, $deparment);            

        return new JsonResponse(['status' => 'Worker created!'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/workers/{id}", name="get_one_worker", methods={"GET"})
     */
    public function getById($id): JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);
        
        $path = $this->helper->asset($worker);

        if (empty($worker))
            return new JsonResponse(['status' => 'Worker do not exists!'], JsonResponse::HTTP_BAD_REQUEST);

        $data = [
            'id' => $worker->getId(),
            'name' => $worker->getName(),
            'birthdate' => $worker->getBirthdate(),
            'address' => $worker->getAddress(),
            'phone' => $worker->getPhone(),
            'email' => $worker->getEmail(),
            'dniNumber' => $worker->getDniNumber(),
            'deparment' => $worker->getDeparment(),
            'photoFile' => $path,
        ];

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/workers", name="get_all_workers", methods={"GET"})
     */
    public function getAll(): JsonResponse
    {
        $workers = $this->workerRepository->findAll();

        if (empty($workers))
            return new JsonResponse(['status' => 'There are no workers!'], JsonResponse::HTTP_BAD_REQUEST);
        
        $data = [];

        foreach ($workers as $worker) {
            $path = $this->helper->asset($worker);

            $data[] = [
                'id' => $worker->getId(),
                'name' => $worker->getName(),
                'birthdate' => $worker->getBirthdate(),
                'address' => $worker->getAddress(),
                'phone' => $worker->getPhone(),
                'email' => $worker->getEmail(),
                'dniNumber' => $worker->getDniNumber(),
                'deparment' => $worker->getDeparment(),
                'photoFile' => $path,
            ];
        }

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/workers/{id}", name="update_worker", methods={"PUT"})
     */
    public function updateById($id, Request $request): JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);

        if (empty($worker))
            return new JsonResponse(['status' => 'Worker do not exists!'], JsonResponse::HTTP_BAD_REQUEST);

        $data = json_decode($request->getContent(), true);       

        empty($data['name']) ? true : $worker->setName($data['name']);
        empty($data['birthdate']) ? true : $worker->setBirthdate(new \DateTime($data['birthdate']));
        empty($data['address']) ? true : $worker->setAddress($data['address']);
        empty($data['phone']) ? true : $worker->setPhone($data['phone']);
        empty($data['email']) ? true : $worker->setEmail($data['email']);
        empty($data['dniNumber']) ? true : $worker->setDniNumber($data['dniNumber']);
        empty($data['deparment']) ? true : $worker->setDeparment($data['deparment']);

        $updatedWorker = $this->workerRepository->updateWorker($worker);
        $updatedWorkerArray = $updatedWorker->toArray();

        $updatedWorkerArray['photoFile'] = $this->helper->asset($updatedWorker);

        return new JsonResponse($updatedWorkerArray, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/workers/{id}", name="delete_worker", methods={"DELETE"})
     */
    public function deleteWorker($id): JsonResponse
    {
        $worker = $this->workerRepository->findOneBy(['id' => $id]);

        if (empty($worker))
            return new JsonResponse(['status' => 'Worker do not exists!'], JsonResponse::HTTP_BAD_REQUEST);        

        $this->workerRepository->removeWorker($worker);

        return new JsonResponse(['status' => 'Worker deleted!'], JsonResponse::HTTP_OK);      
    }
    



}
